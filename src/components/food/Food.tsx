import React, { FC, memo } from 'react';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// components
import DelayedLoader from '../common/DelayedLoader';
import FoodDupes from './FoodDupes';
import FoodItems from './FoodItems';

export const Food: FC = memo(() => {
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
}));

export default Food;
