import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Number from '../common/Number';

export default function ResourceIOsBuildings({ resource, title, type }) {
  const getArray = (resource, type) => {
    switch (type) {
      case 'inputs':
        return getInputs(resource);
      case 'outputs':
        return resource.buildingOutputs;
      case 'both':
        return getBoth(resource);
      default:
        return [];
    }
  };

  const getInputs = resource => {
    return resource.buildingInputs.map(input => {
      return {
        ...input,
        valueExtended: input.valueExtended * -1,
      };
    });
  };

  const getBoth = resource => {
    return resource.buildingOutputs.concat(
      resource.buildingInputs.map(input => {
        return {
          ...input,
          valueExtended: input.valueExtended * -1,
        };
      }),
    );
  };

  const array = getArray(resource, type);

  return (
    <div>
      {array.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Buildings</TableCell>
              <TableCell align="right" padding="dense">
                Quantity
              </TableCell>
              <TableCell align="right" padding="dense">
                Utilization
              </TableCell>
              <TableCell align="right" padding="dense">
                Total {title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((io, index) => {
              return (
                <TableRow key={index}>
                  <TableCell padding="dense">{io.building.name}</TableCell>
                  <TableCell align="right" padding="dense">
                    {io.building.quantity}
                  </TableCell>
                  <TableCell align="right" padding="dense">
                    {io.building.utilization}%
                  </TableCell>
                  <TableCell align="right" padding="dense">
                    <Number value={io.valueExtended} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
