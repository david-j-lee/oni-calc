import { FC, memo } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IResource from './../../interfaces/IResource';

import Number from '../common/Number';

interface IProps {
  resource: IResource;
  title?: string;
  type: string;
}

export const ResourceIOsFood: FC<IProps> = memo(({ resource, title, type }) => {
  const getArray = (resource: IResource, type: string) => {
    switch (type) {
      case 'inputs':
        return getInputs(resource);
      case 'outputs':
        return resource.foodOutputs;
      case 'both':
        return getBoth(resource);
      default:
        return [];
    }
  };

  const getInputs = (resource: IResource) => {
    return resource.foodInputs.map((input) => ({
      ...input,
      valueExtended: input.valueExtended * -1,
    }));
  };

  const getBoth = (resource: IResource) => {
    return resource.foodOutputs.concat(
      resource.foodInputs.map((input) => ({
        ...input,
        valueExtended: input.valueExtended * -1,
      })),
    );
  };

  const array = getArray(resource, type);

  return (
    <div>
      {array.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">Food</TableCell>
              <TableCell align="right" size="small">
                Quantity
              </TableCell>
              <TableCell align="right" size="small">
                Total {title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((io, index) => {
              return (
                <TableRow key={index}>
                  <TableCell size="small">{io.food?.name}</TableCell>
                  <TableCell align="right" size="small">
                    {io.food?.quantity}
                  </TableCell>
                  <TableCell align="right" size="small">
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
});

export default ResourceIOsFood;
