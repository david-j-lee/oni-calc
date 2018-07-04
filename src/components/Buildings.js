import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';

// components
import BuildingsGrid from './BuildingsGrid';
import BuildingsTable from './BuildingsTable';

const styles = theme => ({
  root: {

  },
});

export class Buildings extends React.Component {
  render() {
    const { classes, buildingsLayout } = this.props;

    return (
      <div className={classes.root}>
        {buildingsLayout === 'grid' && <BuildingsGrid />}
        {buildingsLayout === 'table' && <BuildingsTable />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildingsLayout: state.calculator.buildingsLayout,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Buildings))