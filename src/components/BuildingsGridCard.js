import React from 'react';

// redux
import { connect } from 'react-redux';
import { setBuildingQuantity } from '../actions/calculatorActions';

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
    flex: '1 0 auto',
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
    cursor: 'pointer',
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
  dialog: {
    maxWidth: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class BuildingsGridCard extends React.Component {
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
    const { classes, fullScreen } = this.props;
    const { name } = this.props.building;
    const { quantity, anchorEl } = this.state;

    const imgUrl = '/images/buildings/' +
      name.toLowerCase().split(' ').join('-') + '.png';
    const wikLink = 'https://oxygennotincluded.gamepedia.com/' +
      name.split('-').join('_'); // may need to hard code as json

    const popoverOpen = !!anchorEl;

    return (
      <div className={classes.root}>
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
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={imgUrl}
            title={name}
            onMouseOver={this.handlePopoverOpen}
            onMouseOut={this.handlePopoverClose}
          />
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography variant="title" className={classes.cardContentTitle}>
                {name}
              </Typography>
              {/* <Tooltip title="More"> */}
              <IconButton onClick={this.handleClickOpen}>
                <MoreVert />
              </IconButton>
              {/* </Tooltip> */}
            </CardContent>
            <CardActions>
              {/* <Tooltip title="Decrease"> */}
              <IconButton
                color="secondary"
                className={classes.button}
                aria-label="Decrement"
                onClick={this.decrement}>
                <ArrowDropDown />
              </IconButton>
              {/* </Tooltip> */}
              <Typography variant="title" className={classes.quantity}>
                {quantity}
              </Typography>
              {/* <Tooltip title="Increase"> */}
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="Increment"
                onClick={this.increment}>
                <ArrowDropUp />
              </IconButton>
              {/* </Tooltip> */}
            </CardActions>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // updateBuildings: state.calculator.updateBuildings,
  };
}

const mapDispatchToProps = {
  setBuildingQuantity,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingsGridCard));