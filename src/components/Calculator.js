import React, { useEffect } from 'react';
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

export default function Calculator() {
  const classes = useStyles();
  const [{ tabIndex }, { getData, setTabIndex }] = useContext();

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
        className={['left-section', classes.leftSection].join(' ')}
      >
        <Power />
        <Resources />
        <Plants />
        <Capacity />
      </Grid>
      <Grid
        item
        sm={6}
        md={7}
        lg={8}
        className={['right-section', classes.rightSection].join(' ')}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Dupes" />
          <Tab label="Buildings" />
          <Tab label="Food" />
          <Tab label="Geysers" />
        </Tabs>
        {tabIndex === 0 && <Dupes />}
        {tabIndex === 1 && <Buildings />}
        {tabIndex === 2 && <Food />}
        {tabIndex === 3 && <Geysers />}
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
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(2),
  },
  rightSection: {
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
}));
