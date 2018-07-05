import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CapacityBuildings from './CapacityBuildings';

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
  popover: {
    pointerEvents: 'none',
  },
  pointer: {
    cursor: 'pointer',
  },
});

export class Capacity extends React.Component {
  state = {
    anchorEl: null,
    dialogContent: '',
    dialogTitle: '',
    dialogArray: [],
  };

  handlePopoverOpen = (event, title, array) => {
    this.setState({
      anchorEl: event.target,
      dialogTitle: title,
      dialogArray: array,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
      dialogTitle: '',
      dialogArray: [],
    });
  };

  render() {
    const { classes, powerCapacity, resourcesCapacity } = this.props;

    const { anchorEl, dialogTitle, dialogArray } = this.state;
    const dialogOpen = !!anchorEl;

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Capacity</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>

          <Popover
            className={classes.popover}
            classes={{ paper: classes.paper, }}
            open={dialogOpen}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={this.handlePopoverClose}
            disableRestoreFocus>
            <CapacityBuildings title={dialogTitle} buildings={dialogArray} />
          </Popover>

          <div className={classes.capacity}>
            <div className={classes.capacityText}>
              <Typography className={classes.pointer}
                onMouseOut={this.handlePopoverClose}
                onMouseOver={(e) => this.handlePopoverOpen(e, "Power", powerCapacity.buildings)}>
                {powerCapacity.value} kJ
              </Typography>
              <Typography>Power</Typography>
            </div>
            <div className={classes.capacityText}>
              <Typography className={classes.pointer}
                onMouseOut={this.handlePopoverClose}
                onMouseOver={(e) => this.handlePopoverOpen(e, "Resources", resourcesCapacity.buildings)}>
                {resourcesCapacity.value / 1000} T
              </Typography>
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