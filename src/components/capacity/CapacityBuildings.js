import React from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

import Number from '../common/Number';

export default function CapacityBuildings({ buildings, title }) {
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
                    building.capacity[title.toLowerCase()].value *
                    100,
                ) / 100;
              const unit = building.capacity[title.toLowerCase()].unit;
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
}

const useStyles = makeStyles(theme => ({
  noBuildings: {
    padding: theme.spacing(),
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
}));
