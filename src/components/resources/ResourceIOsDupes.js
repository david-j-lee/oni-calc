import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Number from '../common/Number';

export default function ResourceIOsDupes({ resource, title, type }) {
  const getArray = (resource, type) => {
    switch (type) {
      case 'inputs':
        return getInputs(resource);
      case 'outputs':
        return resource.dupeOutputs;
      case 'both':
        return getBoth(resource);
      default:
        return [];
    }
  };

  const getInputs = resource => {
    return resource.dupeInputs.map(input => {
      return {
        ...input,
        valueExtended: input.valueExtended * -1,
      };
    });
  };

  const getBoth = resource => {
    return resource.dupeOutputs.concat(
      resource.dupeInputs.map(input => {
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
              <TableCell padding="dense">Dupes</TableCell>
              <TableCell numeric padding="dense">
                Quantity
              </TableCell>
              <TableCell numeric padding="dense">
                Total {title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((io, index) => {
              return (
                <TableRow key={index}>
                  <TableCell padding="dense">{io.dupe.reference}</TableCell>
                  <TableCell numeric padding="dense">
                    {io.dupe.quantity}
                  </TableCell>
                  <TableCell numeric padding="dense">
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
