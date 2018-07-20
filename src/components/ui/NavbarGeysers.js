import React from 'react';

// redux
import { connect } from 'react-redux';
import { clearGeyserInputs } from '../../actions/geyserActions';

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

export class NavbarGeysers extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  clearGeyserInputs = () => {
    this.props.clearGeyserInputs();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete all of your geyser inputs?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.clearGeyserInputs}
              color="primary"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Clear all geyser inputs">
          <IconButton onClick={this.handleClickOpen} color="inherit">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearGeyserInputs,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(NavbarGeysers));
