import React from 'react';

// redux
import { connect } from 'react-redux';
import {
  setBuildingQuantity,
  setBuildingUtilization,
} from '../../actions/buildingActions';

// material
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/lab/Slider';
// import Tooltip from '@material-ui/core/Tooltip';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// component
import BuildingDetails from './BuildingDetails';

const styles = theme => ({
  root: {
    height: '100%',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    paddingRight: theme.spacing.unit * 2,
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cover: {
    width: 60,
    backgroundSize: 'contain',
    backgroundColor: '#3E4357',
    cursor: 'default',
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing.unit,
    textAlign: 'right',
  },
  category: {
    display: 'flex',
    alignItems: 'center',
  },
  categoryImage: {
    display: 'inline-block',
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  sliderLabel: {
    paddingLeft: theme.spacing.unit * 2,
    textAlign: 'right',
    width: 75,
  },
  dialog: {
    maxWidth: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class BuildingsGridCard extends React.Component {
  timer = 0;
  utilizationTimer = 0;

  state = {
    quantity: this.props.building.quantity,
    utilization: this.props.building.utilization,
    dialogOpen: false,
    popoverOpen: false,
    anchorEl: null,
  };

  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity !== nextProps.building.quantity) {
      this.setState({ quantity: nextProps.building.quantity });
    }
    if (this.state.utilization !== nextProps.building.utilization) {
      this.setState({ utilization: nextProps.building.utilization });
    }
  }

  // on hover
  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  // open dialog
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

  // change quantities
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
    const { classes, fullScreen, building } = this.props;
    const { quantity, utilization, dialogOpen, anchorEl } = this.state;
    const popoverOpen = !!anchorEl;

    const imgUrl = `/images/buildings/${building.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    const wikLink = `https://oxygennotincluded.gamepedia.com/${building.name
      .split('-')
      .join('_')}`; // may need to hard code as json

    return (
      <div className={classes.root} ref={this.rootRef}>
        <Dialog
          fullScreen={fullScreen}
          open={dialogOpen}
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
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <BuildingDetails building={this.props.building} />
        </Popover>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={imgUrl}
            title={building.name}
            onMouseOver={this.handlePopoverOpen}
            onMouseOut={this.handlePopoverClose}
          />
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography
                variant="subheading"
                className={classes.cardContentTitle}
              >
                {building.name}
              </Typography>
              <IconButton onClick={this.handleClickOpen}>
                <MoreVert />
              </IconButton>
            </CardContent>
            <CardActions>
              <IconButton
                color="secondary"
                className={classes.button}
                aria-label="Decrement"
                onClick={this.decrement}
              >
                <ArrowDropDown />
              </IconButton>
              <Typography variant="title" className={classes.quantity}>
                {quantity}
              </Typography>
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="Increment"
                onClick={this.increment}
              >
                <ArrowDropUp />
              </IconButton>
            </CardActions>
            {!building.hasConsistentIO &&
              quantity > 0 && (
                <div className={classes.slider}>
                  <Slider
                    value={utilization}
                    onChange={this.handleSliderChange}
                  />
                  <Typography className={classes.sliderLabel}>
                    {utilization.toFixed(0) + '%'}
                  </Typography>
                </div>
              )}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // updateBuildings: state.calculator.updateBuildings,
  };
};

const mapDispatchToProps = {
  setBuildingQuantity,
  setBuildingUtilization,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BuildingsGridCard));
