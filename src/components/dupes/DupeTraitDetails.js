import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import ResourceChips from '../resources/ResourceChips';

export default function DupeTraitDetails({ trait }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">{trait.name}</Typography>
      <Typography variant="subtitle1" className={classes.title}>
        Inputs
      </Typography>
      <ResourceChips ios={trait.inputs} type="Inputs" />
      <Typography variant="subtitle1" className={classes.title}>
        Outputs
      </Typography>
      <ResourceChips ios={trait.outputs} type="Outputs" />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    minWidth: 400,
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
}));
