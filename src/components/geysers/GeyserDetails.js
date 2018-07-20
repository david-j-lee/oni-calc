import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {},
});

export class GeyserDetails extends React.Component {
  render() {
    const { classes, geyser } = this.props;
    return (
      <div>
        <Typography>{geyser.name}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(GeyserDetails);
