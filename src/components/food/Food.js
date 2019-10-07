import React from 'react';

// material
import { makeStyles } from '@material-ui/styles';

// components
import FoodDupes from './FoodDupes';
import FoodItems from './FoodItems';

export default function Food() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FoodDupes />
      <FoodItems />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
}));
