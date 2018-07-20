import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';

// components
import FoodDupes from './FoodDupes';
import FoodItems from './FoodItems';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

export class Food extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FoodDupes />
        <FoodItems />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // dupes: state.calculator.dupes,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Food));
