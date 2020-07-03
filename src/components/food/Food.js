import React, { memo } from 'react';

// material
import { makeStyles } from '@material-ui/styles';

// components
import DelayedLoader from '../common/DelayedLoader';
import FoodDupes from './FoodDupes';
import FoodItems from './FoodItems';

export const Food = memo(() => {
  const classes = useStyles();

  return (
    <DelayedLoader>
      <div className={classes.root}>
        <FoodDupes />
        <FoodItems />
      </div>
    </DelayedLoader>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
}));

export default Food;
