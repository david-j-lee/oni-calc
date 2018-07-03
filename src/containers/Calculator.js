import React from 'react';

// redux
import { connect } from 'react-redux';
import { getData } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// components
import Capacity from '../components/Capacity';
import Power from '../components/Power';
import Resources from '../components/Resources';
import Buildings from '../components/Buildings';
import Dupes from '../components/Dupes';
import Plants from '../components/Plants';
import Critters from '../components/Critters';

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
  state = {
    value: 0,
  }

  componentWillMount() {
    this.props.getData();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item sm={6} md={5} lg={4} className={['left-section', classes.leftSection].join(' ')}>
          <Power />
          <Resources />
          <Capacity />
        </Grid>
        <Grid item sm={6} md={7} lg={8} className={['right-section', classes.rightSection].join(' ')}>
          <Tabs value={value} onChange={this.handleChange}
            indicatorColor="primary" textColor="primary">
            <Tab label="Buildings" />
            <Tab label="Dupes" />
            <Tab label="Plants" />
            <Tab label="Critters" />
          </Tabs>
          {value === 0 && <Buildings />}
          {value === 1 && <Dupes />}
          {value === 2 && <Plants />}
          {value === 3 && <Critters />}
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  getData
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Calculator));