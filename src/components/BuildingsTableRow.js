import React from 'react';

// redux
import { connect } from 'react-redux';
import { setBuildingQuantity } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

// component
import BuildingDetails from './BuildingDetails';

const styles = theme => ({
  image: {
    width: 45,
    height: 45,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
  buildingImg: {
    width: 45,
    height: 45,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '14pt',
  },
  quantity: {
    fontSize: '14pt',
  },
  actions: {
    whiteSpace: 'nowrap',
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class BuildingsTable extends React.Component {
  timer = 0;

  state = {
    quantity: this.props.building.quantity,
    dialogOpen: false,
    popoverOpen: false,
    anchorEl: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity !== nextProps.building.quantity) {
      this.setState({ quantity: nextProps.building.quantity });
    }
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setBuildingQuantity(this.props.building, this.state.quantity);
    }, 500);
  }

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setBuildingQuantity(
          this.props.building, this.state.quantity);
      }, 500);
    }
  }

  render() {
    const { classes, building, fullScreen } = this.props;
    const { quantity, anchorEl } = this.state;

    const buildingImg = '/images/buildings/' +
      building.name.toLowerCase().split(' ').join('-') + '.png';
    const groupImg = '/images/building-categories/' +
      building.category.toLowerCase().split(' ').join('-') + '.png';

    const wikLink = 'https://oxygennotincluded.gamepedia.com/' +
      building.name.split('-').join('_'); // may need to hard code as json
    const popoverOpen = !!anchorEl;

    return (
      <TableRow>
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper, }}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
          transformOrigin={{ vertical: 'top', horizontal: 'left', }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus>
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
                autoFocus>
                CLOSE
            </Button>
            </DialogActions>
          </div>
        </Dialog>

        <TableCell>
          <div className={classes.title}>
            <div className={classes.image}
              style={{ backgroundImage: `url(${groupImg})` }} />
            {building.category}
          </div>
        </TableCell>

        <TableCell>
          <div className={classes.title}>
            <div className={classes.buildingImg}
              onMouseOver={this.handlePopoverOpen}
              onMouseOut={this.handlePopoverClose}
              style={{ backgroundImage: `url(${buildingImg})` }} />
            {building.name}
          </div>
        </TableCell>

        <TableCell numeric className={classes.quantity}>
          {quantity}
        </TableCell>

        <TableCell>
          <div className={classes.actions}>
            <IconButton
              color="secondary"
              className={classes.button}
              aria-label="Decrement"
              onClick={this.decrement}>
              <ArrowDropDown />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.button}
              aria-label="Increment"
              onClick={this.increment}>
              <ArrowDropUp />
            </IconButton>
            <IconButton onClick={this.handleClickOpen}>
              <MoreHoriz />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = {
  setBuildingQuantity,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingsTable));