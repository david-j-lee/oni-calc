import React, { FC, memo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IDupeTrait from '../../interfaces/IDupeTrait';

import ResourceChips from '../resources/ResourceChips';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTraitDetails: FC<IProps> = memo(({ trait }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">{trait.name}</Typography>
      <Typography variant="subtitle1" className={classes.title}>
        Inputs
      </Typography>
      <ResourceChips ios={trait.inputs} />
      <Typography variant="subtitle1" className={classes.title}>
        Outputs
      </Typography>
      <ResourceChips ios={trait.outputs} />
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    minWidth: 400,
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
}));

export default DupeTraitDetails;
