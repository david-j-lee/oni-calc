import React, { FC, memo } from 'react';

// material
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import IDupes from '../../interfaces/IDupes';

// components
import ResourceChips from '../resources/ResourceChips';

interface IProps {
  details: IDupes;
}

export const DupeDetails: FC<IProps> = memo(({ details }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Dupe Details</Typography>
      <Typography variant="subtitle1" className={classes.title}>
        Inputs
      </Typography>
      <ResourceChips ios={details.inputs} />
      <Typography variant="subtitle1" className={classes.title}>
        Outputs
      </Typography>
      <ResourceChips ios={details.outputs} />
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

export default DupeDetails;
