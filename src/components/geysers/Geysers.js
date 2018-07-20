import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles, Grid } from '@material-ui/core';

// components
import GeyserAdd from './GeyserAdd';
import Geyser from './Geyser';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  geyser: {
    padding: theme.spacing.unit,
  },
});

export class Geysers extends React.Component {
  render() {
    const { classes, geysers } = this.props;

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
}

const mapStateToProps = state => ({
  geysers: state.calculator.geysers,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Geysers));
