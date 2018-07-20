import React from 'react';
import { withRouter, Link, Route } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// icons
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

// components
import ThemePicker from './ThemePicker';
import NavbarDupes from './NavbarDupes';
import NavbarBuildings from './NavbarBuildings';
import NavbarFood from './NavbarFood';
import NavbarGeysers from './NavbarGeysers';

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
  render() {
    const { classes, tabIndex } = this.props;

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
              {tabIndex === 0 && (
                <Route exact path="/" render={() => <NavbarDupes />} />
              )}
              {tabIndex === 1 && (
                <Route exact path="/" render={() => <NavbarBuildings />} />
              )}
              {tabIndex === 2 && (
                <Route exact path="/" render={() => <NavbarFood />} />
              )}
              {tabIndex === 3 && (
                <Route exact path="/" render={() => <NavbarGeysers />} />
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
  };
};

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(Navbar)),
);
