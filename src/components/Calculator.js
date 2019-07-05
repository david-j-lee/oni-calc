import React from 'react';

// redux
import { connect } from 'react-redux';
import { getData } from '../actions/calculatorActions';
import { setTabIndex } from '../actions/uiActions';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// components
import Power from '../components/power/Power';
import Resources from '../components/resources/Resources';
import Plants from '../components/plants/Plants';
import Capacity from '../components/capacity/Capacity';

import Dupes from '../components/dupes/Dupes';
import Buildings from '../components/buildings/Buildings';
import Food from '../components/food/Food';
import Geysers from '../components/geysers/Geysers';

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

  handleChange = (event, value) => {
    this.props.setTabIndex(value);
  };

  render() {
    const { classes, tabIndex } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid
          item
          sm={6}
          md={5}
          lg={4}
          className={['left-section', classes.leftSection].join(' ')}
        >
          <Power />
          <Resources />
          <Plants />
          <Capacity />
        </Grid>
        <Grid
          item
          sm={6}
          md={7}
          lg={8}
          className={['right-section', classes.rightSection].join(' ')}
        >
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Dupes" />
            <Tab label="Buildings" />
            <Tab label="Food" />
            <Tab label="Geysers" />
          </Tabs>
          {tabIndex === 0 && <Dupes />}
          {tabIndex === 1 && <Buildings />}
          {tabIndex === 2 && <Food />}
          {tabIndex === 3 && <Geysers />}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabIndex: state.calculator.tabIndex,
  };
};

const mapDispatchToProps = {
  getData,
  setTabIndex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Calculator));
