import React from 'react';

// redux
import { connect } from 'react-redux';
import { setFoodQuantity } from '../../actions/foodActions';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import FoodItemDetails from './FoodItemDetails';

const styles = theme => ({
  root: {
    height: '100%',
  },
  card: {
    margin: theme.spacing.unit,
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
  dialog: {
    maxWidth: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
});

export class FoodItem extends React.Component {
  state = {
    quantity: this.props.item.quantity,
    dialogOpen: false,
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.item.quantity !== this.state.quantity) {
      this.setState({ quantity: nextProp.item.quantity });
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

  // change quantities
  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setFoodQuantity(this.props.item.name, this.state.quantity);
    }, 500);
  };

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setFoodQuantity(this.props.item.name, this.state.quantity);
      }, 500);
    }
  };

  render() {
    const { classes, fullScreen, item } = this.props;
    const { quantity, dialogOpen, anchorEl } = this.state;
    const popoverOpen = !!anchorEl;

    const wikiLink = `https://oxygennotincluded.gamepedia.com/${item.name
      .toLowerCase()
      .split(' ')
      .join('-')}`;

    const imgUrl = `/images/resources/${item.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={fullScreen}
          open={dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <FoodItemDetails item={item} />
          <DialogActions>
            <Button target="_blank" href={wikiLink} color="primary">
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
          <FoodItemDetails item={item} />
        </Popover>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={imgUrl}
            title={item.name}
            onMouseOver={this.handlePopoverOpen}
            onMouseOut={this.handlePopoverClose}
          />
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography
                variant="subheading"
                className={classes.cardContentTitle}
              >
                {item.name}
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
          </div>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFoodQuantity,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(FoodItem));
