import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';

// components
import DupeQuantity from './DupeQuantity';
import DupeTraits from './DupeTraits';
import DupesWaste from './DupesWaste';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
});

export class Dupes extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DupeQuantity />
        {this.props.dupes.quantity > 0 && <DupeTraits />}
        {this.props.dupes.quantity > 0 && <DupesWaste />}
      </div>
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
)(withStyles(styles)(Dupes));
