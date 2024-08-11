import { FC, memo } from 'react';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IPlant from './../../interfaces/IPlant';

interface IProps {
  plant: IPlant;
}

export const PlantFood: FC<IProps> = memo(({ plant }) => {
  return (
    <div>
      {plant.rawFood &&
        plant.rawFood.length === 0 &&
        plant.preparedFood &&
        plant.preparedFood.length === 0 && (
          <Typography css={notFoundCss}>
            No food related to this plant
          </Typography>
        )}
      {plant.rawFood && plant.rawFood.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Raw Food</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plant.rawFood.map((requirement, i) => {
              return (
                <TableRow key={i}>
                  <TableCell size="small">{requirement.food.name}</TableCell>
                  <TableCell align="right" size="small">
                    {requirement.quantity}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {(plant.preparedFood && plant.preparedFood.length) > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prepared Food</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plant.preparedFood.map((requirement, i) => {
              return (
                <TableRow key={i}>
                  <TableCell size="small">{requirement.food.name}</TableCell>
                  <TableCell align="right" size="small">
                    {requirement.quantity}
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

const notFoundCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default PlantFood;
