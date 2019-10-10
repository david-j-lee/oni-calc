import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useContext } from '../context';

// material
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/styles';

// components
import Power from '../components/power/Power';
import Resources from '../components/resources/Resources';
import Plants from '../components/plants/Plants';
import Capacity from '../components/capacity/Capacity';

import Dupes from '../components/dupes/Dupes';
import Buildings from '../components/buildings/Buildings';
import Food from '../components/food/Food';
import Geysers from '../components/geysers/Geysers';

export default function Calculator({ location }) {
  const classes = useStyles();
  const [, { getData }] = useContext();

  const [tabIndex, setTabIndex] = useState(
    location.pathname === '/dupes'
      ? 0
      : location.pathname === '/buildings'
      ? 1
      : location.pathname === '/food'
      ? 2
      : location.pathname === '/geysers'
      ? 3
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
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Dupes" component={Link} to="/dupes" />
          <Tab label="Buildings" component={Link} to="/buildings" />
          <Tab label="Food" component={Link} to="/food" />
          <Tab label="Geysers" component={Link} to="/geysers" />
        </Tabs>
        <div className={['styled-scrollbar', classes.content].join(' ')}>
          <Switch>
            <Route path="/geysers" render={() => <Geysers />} />
            <Route path="/food" render={() => <Food />} />
            <Route path="/buildings" render={() => <Buildings />} />
            <Route path="/" render={() => <Dupes />} />
          </Switch>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
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
  content: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    overflowY: 'auto',
  },
}));
