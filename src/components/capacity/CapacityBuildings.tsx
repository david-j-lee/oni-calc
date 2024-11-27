import IBuilding from '../../interfaces/IBuilding';
import ICapacity from '../../interfaces/ICapacity';
import Number from '../ui/Number';
import { css } from '@emotion/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo } from 'react';

interface IProps {
  buildings: IBuilding[];
  title: string;
}

export const CapacityBuildings: FC<IProps> = memo(
  ({ buildings, title }: IProps) => {
    if (!title) {
      return null;
    }

    if (title && buildings.length === 0) {
      return (
        <Typography css={noBuildingsCss}>
          No {title.toLowerCase()} found
        </Typography>
      );
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small">Building</TableCell>
            <TableCell align="right" size="small">
              Quantity
            </TableCell>
            <TableCell align="right" size="small">
              Total {title}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings.map((building, index) => {
            const value =
              Math.round(
                building.quantity *
                  building.capacity[title.toLowerCase() as keyof ICapacity]
                    .value *
                  100,
              ) / 100;
            const unit =
              building.capacity[title.toLowerCase() as keyof ICapacity].unit;
            return (
              <TableRow key={index}>
                <TableCell size="small">{building.name}</TableCell>
                <TableCell align="right" size="small">
                  {building.quantity}
                </TableCell>
                <TableCell align="right" size="small">
                  <Number value={value} suffix={' ' + unit} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
);

CapacityBuildings.displayName = 'CapacityBuildings';

const noBuildingsCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default CapacityBuildings;
