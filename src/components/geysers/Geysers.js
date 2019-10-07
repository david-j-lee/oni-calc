import React from 'react';
import { useContext } from '../../context';

// material
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

// components
import GeyserAdd from './GeyserAdd';
import Geyser from './Geyser';

export default function Geysers() {
  const classes = useStyles();
  const [{ geysers }] = useContext();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <GeyserAdd />
        </Grid>
        {geysers.inputted.map((geyser, i) => {
          return (
            <Grid key={i} item xs={12} lg={6} className={classes.geyser}>
              <Geyser geyser={geyser} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
  geyser: {
    padding: theme.spacing(),
  },
}));
