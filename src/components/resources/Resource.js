import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';

import ResourceIOs from './ResourceIOs';
import Number from '../common/Number';

const styles = theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
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
    marginRight: theme.spacing(),
  },
  io: {
    cursor: 'default',
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
    dialogType: '',
  };

  handlePopoverOpen = (event, title, type) => {
    this.setState({
      anchorEl: event.target,
      dialogTitle: title,
      dialogType: type,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
      dialogTitle: '',
      dialogType: '',
    });
  };

  render() {
    const { classes, resource } = this.props;
    const { anchorEl, dialogTitle, dialogType } = this.state;
    const dialogOpen = !!anchorEl;

    const imageUrl = `/images/resources/${resource.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    return (
      <TableRow className={classes.tableRow}>
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <ResourceIOs
            resource={resource}
            title={dialogTitle}
            type={dialogType}
          />
        </Popover>

        <TableCell className={classes.tableCell}>
          <div className={classes.resourceName}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {resource.name}
            {resource.unitOfMeasure ? ' (' + resource.unitOfMeasure + ')' : ''}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div
            className={classes.io}
            onMouseOver={e => this.handlePopoverOpen(e, 'Inputs', 'inputs')}
            onMouseOut={this.handlePopoverClose}
          >
            {Math.round(resource.totalInput)}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div
            className={classes.io}
            onMouseOver={e => this.handlePopoverOpen(e, 'Outputs', 'outputs')}
            onMouseOut={this.handlePopoverClose}
          >
            {Math.round(resource.totalOutput)}
          </div>
        </TableCell>

        <TableCell numeric className={classes.tableCell}>
          <div
            className={classes.io}
            onMouseOver={e =>
              this.handlePopoverOpen(e, 'Inputs or Outputs', 'both')
            }
            onMouseOut={this.handlePopoverClose}
          >
            <Number value={Math.round(resource.totalIO)} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Resource);
