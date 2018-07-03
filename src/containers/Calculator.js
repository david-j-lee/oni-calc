import React from 'react';

// redux
import { connect } from 'react-redux';
import { getData } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// components
import Capacity from '../components/Capacity';
import Power from '../components/Power';
import Resources from '../components/Resources';
import Buildings from '../components/Buildings';

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
  },
  leftSection: {
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
  rightSection: {
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

export class Calculator extends React.Component {
  componentWillMount() {
    this.props.getData();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item sm={6} md={5} lg={4} className={classes.leftSection}>
          <Power />
          <Resources />
          <Capacity />
        </Grid>
        <Grid item sm={6} md={7} lg={8} className={classes.rightSection}>
          <Buildings />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  getData
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Calculator));