import React, { FC, memo, useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useContext } from '../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// components
import Power from './power/Power';
import Resources from './resources/Resources';
import Plants from './plants/Plants';
import Capacity from './capacity/Capacity';

import Dupes from './dupes/Dupes';
import Buildings from './buildings/Buildings';
import Food from './food/Food';
import Geysers from './geysers/Geysers';
import Settings from './settings/Settings';

interface IProps {
  location: any;
}

export const Calculator: FC<IProps> = memo(({ location }) => {
  const classes = useStyles();
  const [, { getData }] = useContext();

  const [tabIndex, setTabIndex] = useState(
    location.pathname === '/settings'
      ? 0
      : location.pathname === '/dupes'
      ? 1
      : location.pathname === '/buildings'
      ? 2
      : location.pathname === '/food'
      ? 3
      : location.pathname === '/geysers'
      ? 4
      : 0,
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (event, value) => {
    setTabIndex(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        sm={6}
        md={5}
        lg={4}
        className={['styled-scrollbar', classes.leftSection].join(' ')}
      >
        <Power />
        <Resources />
        <Plants />
        <Capacity />
      </Grid>
      <Grid item sm={6} md={7} lg={8} className={classes.rightSection}>
        <Tabs
          className={classes.tabs}
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          <Tab label="Settings" component={Link} to="/settings" />
          <Tab label="Dupes" component={Link} to="/dupes" />
          <Tab label="Buildings" component={Link} to="/buildings" />
          <Tab label="Food" component={Link} to="/food" />
          <Tab label="Geysers" component={Link} to="/geysers" />
        </Tabs>
        <div className={['styled-scrollbar', classes.content].join(' ')}>
          <Switch>
            <Route path="/geysers">
              <Geysers />
            </Route>
            <Route path="/food">
              <Food />
            </Route>
            <Route path="/buildings">
              <Buildings />
            </Route>
            <Route path="/dupes">
              <Dupes />
            </Route>
            <Route path="/">
              <Settings />
            </Route>
          </Switch>
        </div>
      </Grid>
    </Grid>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
  },
  leftSection: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  rightSection: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  tabs: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(1, 1, 0, 1),
    height: '100%',
    overflowY: 'auto',
  },
}));

export default Calculator;
