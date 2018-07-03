import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  capacity: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  capacityText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
});

export class Capacity extends React.Component {
  render() {
    const { classes, powerCapacity, resourcesCapacity } = this.props;

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Capacity</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <div className={classes.capacity}>
            <div className={classes.capacityText}>
              <Typography>{powerCapacity} kJ</Typography>
              <Typography>Power</Typography>
            </div>
            <div className={classes.capacityText}>
              <Typography>{resourcesCapacity / 1000} T</Typography>
              <Typography>Storage</Typography>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = state => {
  return {
    powerCapacity: state.calculator.powerCapacity,
    resourcesCapacity: state.calculator.resourcesCapacity,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Capacity));