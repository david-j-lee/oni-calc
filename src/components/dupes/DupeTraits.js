import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// components
import DupeTrait from './DupeTrait';

const styles = theme => ({
  root: {},
  title: {
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
  dupe: {
    padding: theme.spacing.unit,
  },
});

export class DupeTraits extends React.Component {
  componentWillMount() {
    // get traits
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.title}>Traits</Typography>
        </Grid>
        {this.props.dupes.traits.map((trait, i) => {
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
  }
}

const mapStateToProps = state => {
  return {
    dupes: state.calculator.dupes,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(DupeTraits));
