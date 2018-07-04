import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Number from './Number';

const styles = theme => ({
  noIOs: {
    padding: theme.spacing.unit,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
});

export class ResourceIO extends React.Component {
  render() {
    const { classes, ios, title } = this.props;

    return (
      <div>
        {ios.length <= 0
          ?
          <Typography className={classes.noIOs}>
            No {title} found
          </Typography>
          :
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="dense">Building</TableCell>
                <TableCell numeric padding="dense">Quantity</TableCell>
                <TableCell numeric padding="dense">Total {title}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.ios.map((io, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell padding="dense">{io.building.name}</TableCell>
                    <TableCell numeric padding="dense">
                      {io.building.quantity}
                    </TableCell>
                    <TableCell numeric padding="dense">
                      <Number value={Math.round(io.valueExtended * 100) / 100} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        }
      </div>
    )
  }
}

export default withStyles(styles)(ResourceIO);