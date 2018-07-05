import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';

import ResourceIOs from './ResourceIOs';
import Number from './Number';

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
  io: {
    cursor: 'pointer',
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class Resource extends React.Component {
  state = {
    anchorEl: null,
    dialogContent: '',
    dialogTitle: '',
    dialogArray: [],
  };

  handlePopoverOpen = (event, title, array) => {
    this.setState({
      anchorEl: event.target,
      dialogTitle: title,
      dialogArray: array,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
      dialogTitle: '',
      dialogArray: [],
    });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      inputs, outputs,
      totalInput, totalOutput, totalIO,
      unitOfMeasure
    } = this.props.resource;
    const imageUrl = '/images/resources/' +
      name.toLowerCase().split(' ').join('-') + '.png';

    const { anchorEl, dialogTitle, dialogArray } = this.state;
    const dialogOpen = !!anchorEl;

    return (
      <TableRow className={classes.tableRow}>

        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper, }}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
          transformOrigin={{ vertical: 'top', horizontal: 'left', }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus>
          <ResourceIOs title={dialogTitle} ios={dialogArray} />
        </Popover>

        <TableCell className={classes.tableCell}>
          <div className={classes.resourceName}>
            <div className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }} />
            {name}{unitOfMeasure ? ' (' + unitOfMeasure + ')' : ''}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            onMouseOver={(e) => this.handlePopoverOpen(e, "Inputs", inputs)}
            onMouseOut={this.handlePopoverClose}>
            {Math.round(totalInput)}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            onMouseOver={(e) => this.handlePopoverOpen(e, "Outputs", outputs)}
            onMouseOut={this.handlePopoverClose}>
            {Math.round(totalOutput)}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            onMouseOver={(e) => this.handlePopoverOpen(e, "Inputs or Outputs",
              inputs.map(output => {
                return {
                  ...output,
                  valueExtended:
                    (output.valueExtended = output.valueExtended * -1)
                }
              }).concat(outputs))}
            onMouseOut={this.handlePopoverClose}>
            <Number value={Math.round(totalIO)} />
          </div>
        </TableCell>

      </TableRow>
    )
  }
}

export default withStyles(styles)(Resource);