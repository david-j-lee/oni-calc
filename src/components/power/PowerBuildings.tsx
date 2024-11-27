import IBuilding from '../../interfaces/IBuilding';
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

export const PowerBuildings: FC<IProps> = memo(
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
              Utilization
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
                ((building.quantity * building.utilization) / 100.0) *
                  (building.power.generation - building.power.usage) *
                  100.0,
              ) / 100.0;
            const unit = building.power.unit;

            return (
              <TableRow key={index}>
                <TableCell size="small">{building.name}</TableCell>
                <TableCell align="right" size="small">
                  {building.quantity}
                </TableCell>
                <TableCell align="right" size="small">
                  {building.utilization}%
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

PowerBuildings.displayName = 'PowerBuildings';

const noBuildingsCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default PowerBuildings;
