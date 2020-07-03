import React, { memo } from 'react';

// material
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// components
import ResourceChips from '../resources/ResourceChips';

export const DupeDetails = memo(({ details }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Dupe Details</Typography>
      <Typography variant="subtitle1" className={classes.title}>
        Inputs
      </Typography>
      <ResourceChips ios={details.inputs} type="Inputs" />
      <Typography variant="subtitle1" className={classes.title}>
        Outputs
      </Typography>
      <ResourceChips ios={details.outputs} type="Outputs" />
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
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
