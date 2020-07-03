import React from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

// components
import FoodItem from './FoodItem';

export const FoodItems = () => {
  const classes = useStyles();
  const [{ food }] = useContext();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.title}>Raw Food</Typography>
      </Grid>
      {food
        .filter((item) => item.isRaw && item.calories > 0)
        .map((item, i) => {
          return (
            <Grid
              key={i}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className={classes.item}
            >
              <FoodItem item={item} />
            </Grid>
          );
        })}
      <Grid item xs={12}>
        <Typography className={classes.title}>Prepared Food</Typography>
      </Grid>
      {food
        .filter((item) => !item.isRaw && item.calories > 0)
        .map((item, i) => {
          return (
            <Grid
              key={i}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className={classes.item}
            >
              <FoodItem item={item} />
            </Grid>
          );
        })}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  },
  item: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default FoodItems;
