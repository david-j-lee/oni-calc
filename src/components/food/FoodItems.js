import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// components
import FoodItem from './FoodItem';

const styles = theme => ({
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
});

export class FoodItems extends React.Component {
  render() {
    const { classes, food } = this.props;
    const rawFood = food.filter(item => item.isRaw);
    const preparedFood = food.filter(item => !item.isRaw);

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.title}>Raw Food</Typography>
        </Grid>
        {rawFood.filter(item => item.calories > 0).map((item, i) => {
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
        {preparedFood.filter(item => item.calories > 0).map((item, i) => {
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
  }
}

const mapStateToProps = state => ({
  food: state.calculator.food,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(FoodItems));
