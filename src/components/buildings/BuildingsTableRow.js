import React from 'react';

// redux
import { connect } from 'react-redux';
import {
  setBuildingQuantity,
  setBuildingUtilization,
} from '../../actions/buildingActions';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

// component
import BuildingDetails from './BuildingDetails';

const styles = theme => ({
  image: {
    width: 40,
    height: 40,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
  categoryImg: {
    width: 25,
    height: 25,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
    cursor: 'pointer',
  },
  category: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '9pt',
  },
  buildingImg: {
    width: 40,
    height: 40,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
    cursor: 'pointer',
  },
  building: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '12pt',
  },
  quantity: {
    fontSize: '12pt',
  },
  actions: {
    whiteSpace: 'nowrap',
  },
  slider: {
    width: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },
  sliderLabel: {
    paddingLeft: theme.spacing.unit * 2,
    textAlign: 'right',
    width: 75,
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class BuildingsTable extends React.Component {
  timer = 0;
  utilizationTimer = 0;

  state = {
    quantity: this.props.building.quantity,
    utilization: this.props.building.utilization || 0,
    dialogOpen: false,
    popoverOpen: false,
    anchorEl: null,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity !== nextProps.building.quantity) {
      this.setState({ quantity: nextProps.building.quantity });
    }
  }

  // on hover
  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  // more info
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  // utilization
  handleSliderChange = (event, value) => {
    this.setState({ utilization: value });
    if (this.utilizationTimer) {
      clearTimeout(this.utilizationTimer);
    }
    this.utilizationTimer = setTimeout(() => {
      this.props.setBuildingUtilization(
        this.props.building.name,
        Math.round(this.state.utilization),
      );
    }, 500);
  };

  // quantities
  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setBuildingQuantity(
        this.props.building.name,
        this.state.quantity,
      );
    }, 500);
  };

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setBuildingQuantity(
          this.props.building.name,
          this.state.quantity,
        );
      }, 500);
    }
  };

  render() {
    const { classes, building, fullScreen } = this.props;
    const { quantity, utilization, anchorEl } = this.state;

    const buildingImg =
      '/images/buildings/' +
      building.name
        .toLowerCase()
        .split(' ')
        .join('-') +
      '.png';
    const groupImg =
      '/images/building-categories/' +
      building.category
        .toLowerCase()
        .split(' ')
        .join('-') +
      '.png';

    const wikLink =
      'https://oxygennotincluded.gamepedia.com/' +
      building.name.split('-').join('_'); // may need to hard code as json
    const popoverOpen = !!anchorEl;

    return (
      <TableRow>
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <BuildingDetails building={this.props.building} />
        </Popover>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <div className={classes.dialog}>
            <BuildingDetails building={this.props.building} />
            <DialogActions>
              <Button target="_blank" href={wikLink} color="primary">
                WIKI
              </Button>
              <Button
                variant="contained"
                onClick={this.handleClose}
                color="primary"
                autoFocus
              >
                CLOSE
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        <TableCell padding="dense">
          <div className={classes.category}>
            <div
              className={classes.categoryImg}
              style={{ backgroundImage: `url(${groupImg})` }}
            />
            {building.category}
          </div>
        </TableCell>

        <TableCell padding="dense">
          <div className={classes.building}>
            <div
              className={classes.buildingImg}
              onMouseOver={this.handlePopoverOpen}
              onMouseOut={this.handlePopoverClose}
              style={{ backgroundImage: `url(${buildingImg})` }}
            />
            {building.name}
          </div>
        </TableCell>

        <TableCell padding="dense">
          {!building.hasConsistentIO &&
            building.quantity > 0 && (
              <span className={classes.slider}>
                <Slider
                  value={utilization}
                  onChange={this.handleSliderChange}
                />
                <Typography className={classes.sliderLabel}>
                  {utilization.toFixed(0) + '%'}
                </Typography>
              </span>
            )}
        </TableCell>

        <TableCell numeric className={classes.quantity} padding="dense">
          {quantity}
        </TableCell>

        <TableCell padding="dense">
          <div className={classes.actions}>
            <IconButton
              color="secondary"
              className={classes.button}
              aria-label="Decrement"
              onClick={this.decrement}
            >
              <ArrowDropDown />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.button}
              aria-label="Increment"
              onClick={this.increment}
            >
              <ArrowDropUp />
            </IconButton>
            <IconButton onClick={this.handleClickOpen}>
              <MoreHoriz />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setBuildingQuantity,
  setBuildingUtilization,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BuildingsTable));
