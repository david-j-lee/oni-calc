import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export const DelayedLoader = ({ children }) => {
  const classes = useStyles();
  const [ready, setReady] = useState();

  useEffect(() => {
    setTimeout(() => setReady(true));
  }, [setReady]);

  if (!ready) {
    return (
      <div className={classes.DelayedLoader}>
        <CircularProgress />
      </div>
    );
  }

  return children;
};

const useStyles = makeStyles((theme) => ({
  DelayedLoader: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default DelayedLoader;
