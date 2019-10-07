import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Number({ value, suffix, variant, color }) {
  const classes = useStyles();
  const displayValue = Math.round(Math.abs(value) * 100) / 100;
  const sign = value === 0 ? '' : value >= 0 ? '+' : '-';
  const eleClass =
    value === 0 ? '' : value >= 0 ? classes.positive : classes.negative;

  return (
    <Typography className={classes.root} variant={variant} color={color}>
      <span className={eleClass}>{sign}</span> {displayValue} {suffix}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    whiteSpace: 'nowrap',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
}));
