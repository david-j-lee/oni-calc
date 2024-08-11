import { FC, memo } from 'react';

import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IBuilding from '../../interfaces/IBuilding';

import Number from '../common/Number';
import ICapacity from '../../interfaces/ICapacity';

interface IProps {
  buildings: IBuilding[];
  title: string;
}

export const CapacityBuildings: FC<IProps> = memo(({ buildings, title }) => {
  return (
    <div>
      {buildings.length <= 0 ? (
        <Typography css={noBuildingsCss}>
          No {title.toLowerCase()} found
        </Typography>
      ) : (
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
      )}
    </div>
  );
});

const noBuildingsCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default CapacityBuildings;
