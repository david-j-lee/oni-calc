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
  resourceName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  image: {
    height: 15,
    width: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
});

export class Resource extends React.Component {
  render() {
    const { classes } = this.props;
    const { name, totalInput, totalOutput, totalIO, unitOfMeasure } = this.props.resource;
    const imageUrl = '/images/resources/' + name.toLowerCase().split(' ').join('-') + '.png';
    return (
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.tableCell}>
          <div className={classes.resourceName}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }} />
            {name}{unitOfMeasure ? ' (' + unitOfMeasure + ')' : ''}
          </div>
        </TableCell>
        <TableCell numeric className={classes.tableCell}>{Math.round(totalInput)}</TableCell>
        <TableCell numeric className={classes.tableCell}>{Math.round(totalOutput)}</TableCell>
        <TableCell numeric className={classes.tableCell}>{Math.round(totalIO)}</TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(Resource);