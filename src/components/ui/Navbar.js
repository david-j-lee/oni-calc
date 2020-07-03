import React, { memo } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

// material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';

// icons
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

// components
import NavbarDupes from './NavbarDupes';
import NavbarBuildings from './NavbarBuildings';
import NavbarFood from './NavbarFood';
import NavbarGeysers from './NavbarGeysers';
import ThemePicker from './ThemePicker';

export const Navbar = memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" color="inherit">
            O<span className={classes.oniColor}>N</span>I
            <span className={classes.onicColor}>C</span>
          </Typography>
          <div className={classes.flex}>
            <Tooltip title="Home">
              <IconButton
                component={Link}
                to="/"
                color="inherit"
                aria-label="Home"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="About">
              <IconButton
                component={Link}
                to="/about"
                color="inherit"
                aria-label="Help"
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.rightNav}>
            <Switch>
              <Route exact path="/geysers" render={() => <NavbarGeysers />} />
              <Route exact path="/food" render={() => <NavbarFood />} />
              <Route
                exact
                path="/buildings"
                render={() => <NavbarBuildings />}
              />
              <Route path="/" render={() => <NavbarDupes />} />
            </Switch>
            <ThemePicker />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(),
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
}));

export default Navbar;
