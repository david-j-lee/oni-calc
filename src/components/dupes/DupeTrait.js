import React from 'react';

// redux
import { connect } from 'react-redux';
import { setDupeTraitQuantity } from '../../actions/dupeActions';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import DupeTraitDetails from './DupeTraitDetails';

const styles = theme => ({
  root: {},
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing.unit * 2,
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing.unit,
    textAlign: 'right',
  },
});

export class DupeTrait extends React.Component {
  state = {
    quantity: this.props.trait.quantity,
    dialogOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity > nextProps.dupes.quantity) {
      this.setState({ quantity: nextProps.trait.quantity });
    }
  }

  // open dialog
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  // change quantities
  increment = () => {
    if (this.state.quantity < this.props.dupes.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setDupeTraitQuantity(
          this.props.trait.name,
          this.state.quantity,
        );
      }, 500);
    }
  };

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setDupeTraitQuantity(
          this.props.trait.name,
          this.state.quantity,
        );
      }, 500);
    }
  };

  render() {
    const { classes, fullScreen, trait } = this.props;
    const { quantity, dialogOpen } = this.state;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DupeTraitDetails trait={trait} />
          <DialogActions>
            <Button
              target="_blank"
              href="https://oxygennotincluded.gamepedia.com/duplicant"
              color="primary"
            >
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
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="subheading"
              className={classes.cardContentTitle}
            >
              {trait.name}
            </Typography>
            <IconButton onClick={this.handleClickOpen}>
              <MoreVert />
            </IconButton>
          </CardContent>
          <CardActions>
            {/* <Tooltip title="Decrease"> */}
            <IconButton
              color="secondary"
              className={classes.button}
              aria-label="Decrement"
              onClick={this.decrement}
            >
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
              onClick={this.increment}
            >
              <ArrowDropUp />
            </IconButton>
            {/* </Tooltip> */}
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dupes: state.calculator.dupes,
  };
};

const mapDispatchToProps = {
  setDupeTraitQuantity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DupeTrait));
