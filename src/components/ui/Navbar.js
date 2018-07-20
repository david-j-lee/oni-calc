import React from 'react';
import { withRouter, Link, Route } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import {
  clearBuildingQuantities,
  setBuildingsLayout,
} from '../../actions/buildingActions';

// material
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

// icons
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import ClearIcon from '@material-ui/icons/Clear';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';

// components
import ThemePicker from './ThemePicker';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing.unit,
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
  rightNav: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  oniColor: {
    color: '#FD6B6B',
  },
  onicColor: {
    color: '#00E3E3',
  },
});

export class Navbar extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  setBuildingsLayout = () => {
    this.props.setBuildingsLayout();
  };

  clearBuildingQuantities = () => {
    this.props.clearBuildingQuantities();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, tabIndex, buildingsLayout } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
            >
              O<span className={classes.oniColor}>N</span>I<span
                className={classes.onicColor}
              >
                C
              </span>
            </Typography>
            <div className={classes.flex}>
              <Tooltip title="Home">
                <IconButton
                  component={Link}
                  to="/"
                  color="inherit"
                  size="small"
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="About">
                <IconButton
                  component={Link}
                  to="/about"
                  color="inherit"
                  size="small"
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.rightNav}>
              {tabIndex === 1 && (
                <Route
                  exact
                  path="/"
                  render={() => (
                    <div>
                      <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                      >
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete all your inputted
                            quantities?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={this.clearBuildingQuantities}
                            color="primary"
                            autoFocus
                          >
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Tooltip title="Clear all quantities">
                        <IconButton
                          onClick={this.handleClickOpen}
                          color="inherit"
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          'Set to ' +
                          (buildingsLayout === 'grid' ? 'table' : 'grid') +
                          ' layout'
                        }
                      >
                        <IconButton
                          onClick={this.setBuildingsLayout}
                          color="inherit"
                        >
                          {buildingsLayout === 'grid' && <ViewList />}
                          {buildingsLayout === 'table' && <ViewModule />}
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                />
              )}
              <ThemePicker />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabIndex: state.calculator.tabIndex,
    buildingsLayout: state.calculator.buildingsLayout,
  };
};

const mapDispatchToProps = {
  clearBuildingQuantities,
  setBuildingsLayout,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(Navbar)),
);
