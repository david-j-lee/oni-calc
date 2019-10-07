import React from 'react';

// material
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

export default function PlantFood({ plant }) {
  const classes = useStyles();

  return (
    <div>
      {plant.rawFood &&
        plant.rawFood.length === 0 &&
        plant.preparedFood &&
        plant.preparedFood.length === 0 && (
          <Typography className={classes.notFound}>No food found</Typography>
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
}

const useStyles = makeStyles(theme => ({
  notFound: {
    padding: theme.spacing(),
  },
}));
