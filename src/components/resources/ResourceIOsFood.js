import React from 'react';

import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Number from '../common/Number';

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

export class ResourceIOsFood extends React.Component {
  getArray(resource, type) {
    switch (type) {
      case 'inputs':
        return this.getInputs(resource);
      case 'outputs':
        return resource.foodOutputs;
      case 'both':
        return this.getBoth(resource);
      default:
        return [];
    }
  }

  getInputs = resource => {
    return resource.foodInputs.map(input => ({
      ...input,
      valueExtended: input.valueExtended * -1,
    }));
  };

  getBoth = resource => {
    return resource.foodOutputs.concat(
      resource.foodInputs.map(input => ({
        ...input,
        valueExtended: input.valueExtended * -1,
      })),
    );
  };

  render() {
    const { resource, title, type } = this.props;
    const array = this.getArray(resource, type);

    return (
      <div>
        {array.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="dense">Food</TableCell>
                <TableCell numeric padding="dense">
                  Quantity
                </TableCell>
                <TableCell numeric padding="dense">
                  Total {title}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((io, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell padding="dense">{io.food.name}</TableCell>
                    <TableCell numeric padding="dense">
                      {io.food.quantity}
                    </TableCell>
                    <TableCell numeric padding="dense">
                      <Number value={io.valueExtended} />
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

export default withStyles(styles)(ResourceIOsFood);
