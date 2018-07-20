import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// components
import ResourceChips from '../resources/ResourceChips';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    minWidth: 400,
  },
  title: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
  },
});

export class DupeDetails extends React.Component {
  render() {
    const { classes, details } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="title">Dupe Details</Typography>
        <Typography variant="subheading" className={classes.title}>
          Inputs
        </Typography>
        <ResourceChips ios={details.inputs} type="Inputs" />
        <Typography variant="subheading" className={classes.title}>
          Outputs
        </Typography>
        <ResourceChips ios={details.outputs} type="Outputs" />
      </div>
    );
  }
}

export default withStyles(styles)(DupeDetails);
