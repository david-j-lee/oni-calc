import React, { FC } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// components
import DupeTrait from './DupeTrait';

export const DupeTraits: FC = () => {
  const classes = useStyles();
  const [{ dupes }] = useContext();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.title}>Traits</Typography>
      </Grid>
      {dupes.traits.map((trait, i) => {
        return (
          <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <div className={classes.dupe}>
              <DupeTrait trait={trait} />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  },
  dupe: {
    padding: theme.spacing(),
  },
}));

export default DupeTraits;
