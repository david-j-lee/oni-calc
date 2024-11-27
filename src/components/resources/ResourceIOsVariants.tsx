import { toTitleCase } from '../../utils/commonUtils';
import Number from '../ui/Number';
import IResource from './../../interfaces/IResource';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, memo, useMemo } from 'react';

const getArray = (
  entity: string,
  resource: IResource,
  type: 'inputs' | 'outputs' | 'both',
) => {
  switch (type) {
    case 'inputs':
      return getInputs(entity, resource);
    case 'outputs':
      return resource.subtotals[entity as keyof typeof resource.subtotals]
        .outputs;
    case 'both':
      return getBoth(entity, resource);
    default:
      return [];
  }
};

const getInputs = (entity: string, resource: IResource) => {
  return resource.subtotals[
    entity as keyof typeof resource.subtotals
  ].inputs.map((input) => ({
    ...input,
    valueExtended: input.valueExtended * -1,
  }));
};

const getBoth = (entity: string, resource: IResource) => {
  return resource.subtotals[
    entity as keyof typeof resource.subtotals
  ].outputs.concat(
    resource.subtotals[entity as keyof typeof resource.subtotals].inputs.map(
      (input) => ({
        ...input,
        valueExtended: input.valueExtended * -1,
      }),
    ),
  );
};

interface IProps {
  entity: string;
  resource: IResource;
  type: 'inputs' | 'outputs' | 'both';
}

export const ResourceIOsVariants: FC<IProps> = memo(
  ({ resource, entity, type }: IProps) => {
    const array = useMemo(
      () => getArray(entity, resource, type),
      [resource, entity, type],
    );
    const title = useMemo(() => toTitleCase(entity), [entity]);

    return (
      <div>
        {array.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell size="small">{title}</TableCell>
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
                    <TableCell size="small">{io.entity?.name}</TableCell>
                    <TableCell align="right" size="small" width={'120px'}>
                      {io.entity?.quantity}
                    </TableCell>
                    <TableCell align="right" size="small" width={'120px'}>
                      {io.entity?.utilization}%
                      {io.utilization !== 100 && (
                        <small> ({io.utilization}%)</small>
                      )}
                    </TableCell>
                    <TableCell align="right" size="small" width={'140px'}>
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

ResourceIOsVariants.displayName = 'ResourceIOsVariants';

export default ResourceIOsVariants;
