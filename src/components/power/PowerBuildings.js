import React from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

import Number from '../common/Number';

export default function PowerBuildings({ buildings, title }) {
  const classes = useStyles();

  return (
    <div>
      {buildings.length <= 0 ? (
        <Typography className={classes.noBuildings}>
          No {title.toLowerCase()} found
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Building</TableCell>
              <TableCell align="right" padding="dense">
                Quantity
              </TableCell>
              <TableCell align="right" padding="dense">
                Utilization
              </TableCell>
              <TableCell align="right" padding="dense">
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
                  <TableCell padding="dense">{building.name}</TableCell>
                  <TableCell align="right" padding="dense">
                    {building.quantity}
                  </TableCell>
                  <TableCell align="right" padding="dense">
                    {building.utilization}%
                  </TableCell>
                  <TableCell align="right" padding="dense">
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
}

const useStyles = makeStyles(theme => ({
  noBuildings: {
    padding: theme.spacing(),
  },
}));
