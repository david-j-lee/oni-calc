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

export const ResourceIOsGeysers: FC<IProps> = memo(
  ({ resource, title, type }) => {
    const getArray = (resource: IResource, type: string) => {
      switch (type) {
        case 'inputs':
          return getInputs(resource);
        case 'outputs':
          return resource.geyserOutputs;
        case 'both':
          return getBoth(resource);
        default:
          return [];
      }
    };

    const getInputs = (resource: IResource) => {
      return resource.geyserInputs.map((input) => {
        return {
          ...input,
          valueExtended: input.valueExtended * -1,
        };
      });
    };

    const getBoth = (resource: IResource) => {
      return resource.geyserOutputs.concat(
        resource.geyserInputs.map((input) => {
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
                <TableCell size="small">Geysers</TableCell>
                <TableCell align="right" size="small">
                  Total {title}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((io, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell size="small">{io.name}</TableCell>
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

export default ResourceIOsGeysers;
