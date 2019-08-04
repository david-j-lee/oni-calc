import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ResourceChips from '../resources/ResourceChips';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    minWidth: 400,
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
});

export class DupeTraitDetails extends React.Component {
  render() {
    const { classes, trait } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="title">{trait.name}</Typography>
        <Typography variant="subheading" className={classes.title}>
          Inputs
        </Typography>
        <ResourceChips ios={trait.inputs} type="Inputs" />
        <Typography variant="subheading" className={classes.title}>
          Outputs
        </Typography>
        <ResourceChips ios={trait.outputs} type="Outputs" />
      </div>
    );
  }
}

export default withStyles(styles)(DupeTraitDetails);
