import React, { FC, memo } from 'react';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import IPlant from './../../interfaces/IPlant';

interface IProps {
  plant: IPlant;
}

export const PlantFood: FC<IProps> = memo(({ plant }) => {
  const classes = useStyles();

  return (
    <div>
      {plant.rawFood &&
        plant.rawFood.length === 0 &&
        plant.preparedFood &&
        plant.preparedFood.length === 0 && (
          <Typography className={classes.notFound}>No food related to this plant</Typography>
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

const useStyles = makeStyles((theme: Theme) => ({
  notFound: {
    padding: theme.spacing(),
  },
}));

export default PlantFood;
