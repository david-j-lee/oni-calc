import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    whiteSpace: 'nowrap',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
};

export class Number extends React.Component {
  render() {
    const { classes, value, suffix } = this.props;
    const displayValue = Math.round(Math.abs(value) * 100) / 100;
    const sign = value === 0 ? '' : value >= 0 ? '+' : '-';
    const eleClass =
      value === 0 ? '' : value >= 0 ? classes.positive : classes.negative;

    return (
      <Typography
        className={classes.root}
        variant={this.props.variant}
        color={this.props.color}
      >
        <span className={eleClass}>{sign}</span> {displayValue} {suffix}
      </Typography>
    );
  }
}

export default withStyles(styles)(Number);
