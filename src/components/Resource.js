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
    inputsAnchorEl: null,
    outputsAnchorEl: null,
    netsAnchorEl: null,
  };

  handlePopoverOpen = (event, prop) => {
    this.setState({ [prop]: event.target });
  };

  handlePopoverClose = (event, prop) => {
    this.setState({ [prop]: null });
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

    const { inputsAnchorEl, outputsAnchorEl, netsAnchorEl } = this.state;
    const inputsOpen = !!inputsAnchorEl;
    const outputsOpen = !!outputsAnchorEl;
    const netsOpen = !!netsAnchorEl;

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
        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            onMouseOver={(e) => this.handlePopoverOpen(e, "inputsAnchorEl")}
            onMouseOut={(e) => this.handlePopoverClose(e, "inputsAnchorEl")}>
            {Math.round(totalInput)}
          </div>
          <Popover
            name="inputsAnchorEl"
            className={classes.popover}
            classes={{ paper: classes.paper, }}
            open={inputsOpen}
            anchorEl={inputsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={(e) => this.handlePopoverClose(e, "inputsAnchorEl")}
            disableRestoreFocus>
            <ResourceIOs title="Inputs" ios={inputs} />
          </Popover>
        </TableCell>
        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            name="outputsAnchorEl"
            onMouseOver={(e) => this.handlePopoverOpen(e, "outputsAnchorEl")}
            onMouseOut={(e) => this.handlePopoverClose(e, "outputsAnchorEl")}>
            {Math.round(totalOutput)}
          </div>
          <Popover
            name="outputsAnchorEl"
            className={classes.popover}
            classes={{ paper: classes.paper }}
            open={outputsOpen}
            anchorEl={outputsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={(e) => this.handlePopoverClose(e, "outputsAnchorEl")}
            disableRestoreFocus>
            <ResourceIOs title="Outputs" ios={outputs} />
          </Popover>
        </TableCell>
        <TableCell numeric className={classes.tableCell}>
          <div className={classes.io}
            onMouseOver={(e) => this.handlePopoverOpen(e, "netsAnchorEl")}
            onMouseOut={(e) => this.handlePopoverClose(e, "netsAnchorEl")}>
            <Number value={Math.round(totalIO)} />
          </div>
          <Popover
            className={classes.popover}
            classes={{ paper: classes.paper }}
            open={netsOpen}
            anchorEl={netsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={(e) => this.handlePopoverClose(e, "netsAnchorEl")}
            disableRestoreFocus>
            <ResourceIOs title="Inputs or Outputs"
              ios={inputs.map(output => {
                return { ...output, valueExtended: (output.valueExtended = output.valueExtended * -1) }
              }).concat(outputs)} />
          </Popover>
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(Resource);