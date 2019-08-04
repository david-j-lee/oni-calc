import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';

// component
import PlantFood from './PlantFood';
import PlantDetails from './PlantDetails';

const styles = theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
  },
  plantName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'default',
  },
  image: {
    height: 20,
    width: 20,
    backgroundSize: '200%',
    backgroundPosition: 'center',
    marginRight: theme.spacing(),
  },
  quantity: {
    cursor: 'default',
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class Plant extends React.Component {
  state = {
    detailsAnchorEl: null,
    foodAnchorEl: null,
  };

  handleDetailsPopoverOpen = event => {
    this.setState({ detailsAnchorEl: event.target });
  };

  handleDetailsPopoverClose = () => {
    this.setState({ detailsAnchorEl: null });
  };

  handleFoodPopoverOpen = event => {
    this.setState({ foodAnchorEl: event.target });
  };

  handleFoodPopoverClose = () => {
    this.setState({ foodAnchorEl: null });
  };

  render() {
    const { classes, plant } = this.props;
    const { detailsAnchorEl, foodAnchorEl } = this.state;

    const detailsDialogOpen = !!detailsAnchorEl;
    const foodDialogOpen = !!foodAnchorEl;

    const imageUrl = `/images/bio/${plant.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    return (
      <TableRow className={classes.tableRow}>
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={detailsDialogOpen}
          anchorEl={detailsAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handleDetailsPopoverClose}
          disableRestoreFocus
        >
          <PlantDetails plant={plant} />
        </Popover>
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={foodDialogOpen}
          anchorEl={foodAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handleFoodPopoverClose}
          disableRestoreFocus
        >
          <PlantFood plant={plant} />
        </Popover>

        <TableCell className={classes.tableCell}>
          <div
            className={classes.plantName}
            onMouseOver={this.handleDetailsPopoverOpen}
            onMouseOut={this.handleDetailsPopoverClose}
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {plant.name}
          </div>
        </TableCell>
        <TableCell numeric className={classes.tableCell}>
          <div
            className={classes.quantity}
            onMouseOver={this.handleFoodPopoverOpen}
            onMouseOut={this.handleFoodPopoverClose}
          >
            {plant.quantity}
          </div>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Plant);
