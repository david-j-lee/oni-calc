import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';

export default function FoodDupes() {
  const classes = useStyles();

  const [{ dupes, food }] = useContext();

  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesClassName, setCaloriesClassName] = useState('');

  useEffect(() => {
    if (food.length > 0) {
      setTotalCalories(
        food.map(item => item.calories * item.quantity).reduce((a, b) => a + b),
      );
    }
  }, [food]);

  useEffect(() => {
    setCaloriesClassName(
      totalCalories === 0 || !dupes.caloriesRequired
        ? ''
        : totalCalories >= dupes.caloriesRequired
        ? classes.surplus
        : classes.deficit,
    );
  }, [totalCalories, dupes, classes]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              {dupes.quantity} Dupes
            </Typography>
            <Typography>
              <span className={caloriesClassName}>{totalCalories}</span> of{' '}
              {dupes.caloriesRequired || 0} kcal/cycle
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    paddingBottom: theme.spacing(),
  },
  card: {
    margin: theme.spacing(),
  },
  surplus: {
    color: 'green',
  },
  deficit: {
    color: 'red',
  },
}));
