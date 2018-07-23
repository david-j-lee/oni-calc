import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  notFound: {
    padding: theme.spacing.unit,
  },
});

export class PlantFood extends React.Component {
  render() {
    const { classes, plant } = this.props;
    return (
      <div>
        {plant.rawFood &&
          plant.rawFood.length === 0 &&
          plant.preparedFood &&
          plant.preparedFood.length === 0 && (
            <Typography className={classes.notFound}>No food found</Typography>
          )}
        {plant.rawFood &&
          plant.rawFood.length > 0 && (
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
                      <TableCell padding="dense">
                        {requirement.food.name}
                      </TableCell>
                      <TableCell numeric padding="dense">
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
                    <TableCell padding="dense">
                      {requirement.food.name}
                    </TableCell>
                    <TableCell numeric padding="dense">
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
}

export default withStyles(styles)(PlantFood);
