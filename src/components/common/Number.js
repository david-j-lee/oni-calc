import React, { memo, useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export const Number = memo(({ value, suffix, variant, color }) => {
  const classes = useStyles();

  const [displayValue, setDisplayValue] = useState(0);
  const [sign, setSign] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    setDisplayValue(Math.round(Math.abs(value) * 100) / 100);
    setSign(value === 0 ? '' : value >= 0 ? '+' : '-');
    setClassName(
      value === 0 ? '' : value >= 0 ? classes.positive : classes.negative,
    );
  }, [value, classes]);

  return (
    <Typography className={classes.root} variant={variant} color={color}>
      <span className={[className, classes.sign].join(' ')}>{sign}</span>{' '}
      {displayValue.toLocaleString()} {suffix}
    </Typography>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    whiteSpace: 'nowrap',
  },
  sign: {
    pointerEvents: 'none',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
}));

export default Number;
