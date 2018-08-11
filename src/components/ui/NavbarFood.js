import React from 'react';

// redux
import { connect } from 'react-redux';
import { clearFoodInputs } from '../../actions/foodActions';

// material
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
  root: {},
});

export class NavbarFood extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  clearFoodInputs = () => {
    this.props.clearFoodInputs();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete all of your food inputs?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.clearFoodInputs}
              color="primary"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Clear all food inputs">
          <IconButton
            onClick={this.handleClickOpen}
            color="inherit"
            aria-label="Clear All Food"
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearFoodInputs,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(NavbarFood));
