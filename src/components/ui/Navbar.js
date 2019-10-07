import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useContext } from '../../context';

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
import ThemePicker from './ThemePicker';
import NavbarDupes from './NavbarDupes';
import NavbarBuildings from './NavbarBuildings';
import NavbarFood from './NavbarFood';
import NavbarGeysers from './NavbarGeysers';

export default function Navbar() {
  const classes = useStyles();
  const [{ tabIndex }] = useContext();

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
                size="small"
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
                size="small"
                aria-label="Help"
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

const useStyles = makeStyles(theme => ({
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
