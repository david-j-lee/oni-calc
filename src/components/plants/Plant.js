import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing.unit,
  },
  plantName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    backgroundSize: '200%',
    backgroundPosition: 'center',
    marginRight: theme.spacing.unit,
  },
});

export class Plant extends React.Component {
  render() {
    const { classes, plant } = this.props;

    const imageUrl = `/images/plants/${plant.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    return (
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.tableCell}>
          <div className={classes.plantName}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {plant.name}
          </div>
        </TableCell>
        <TableCell numeric className={classes.tableCell}>
          {plant.quantity}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Plant);
