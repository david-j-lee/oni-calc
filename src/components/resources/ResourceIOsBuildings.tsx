import Number from '../ui/Number';
import IResource from './../../interfaces/IResource';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, memo, useMemo } from 'react';

const getArray = (resource: IResource, type: string) => {
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

const getInputs = (resource: IResource) => {
  return resource.buildingInputs.map((input) => {
    return {
      ...input,
      valueExtended: input.valueExtended * -1,
    };
  });
};

const getBoth = (resource: IResource) => {
  return resource.buildingOutputs.concat(
    resource.buildingInputs.map((input) => {
      return {
        ...input,
        valueExtended: input.valueExtended * -1,
      };
    }),
  );
};

interface IProps {
  resource: IResource;
  title?: string;
  type: string;
}

export const ResourceIOsBuildings: FC<IProps> = memo(
  ({ resource, title, type }) => {
    const array = useMemo(() => getArray(resource, type), [type, resource]);

    return (
      <div>
        {array.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell size="small">Buildings</TableCell>
                <TableCell align="right" size="small">
                  Quantity
                </TableCell>
                <TableCell align="right" size="small">
                  Utilization
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
                    <TableCell size="small">{io.building?.name}</TableCell>
                    <TableCell align="right" size="small">
                      {io.building?.quantity}
                    </TableCell>
                    <TableCell align="right" size="small">
                      {io.building?.utilization}%
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
  },
);

export default ResourceIOsBuildings;
