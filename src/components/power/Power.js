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

// components
import Number from "../common/Number";
import PowerBuildings from "./PowerBuildings";

const styles = theme => ({
  power: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  powerText: {
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

export class Power extends React.Component {
  state = {
    netColor: 'inherit',
    dialogContent: '',
    dialogTitle: '',
    dialogArray: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.powerUsage.value > nextProps.powerGeneration.value) {
      this.setState({ netColor: 'red' });
    } else {
      this.setState({ netColor: 'green' });
    }
  }

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
    const { classes, powerUsage, powerGeneration } = this.props;

    const { anchorEl, dialogTitle, dialogArray } = this.state;
    const dialogOpen = !!anchorEl;

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Power</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <Popover
            className={classes.popover}
            classes={{ paper: classes.paper, }}
            open={dialogOpen}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={this.handlePopoverClose}
            disableRestoreFocus>
            <PowerBuildings title={dialogTitle} buildings={dialogArray} />
          </Popover>

          <div className={classes.power}>

            <div className={classes.powerText}>
              <span className={classes.pointer}
                onMouseOut={this.handlePopoverClose}
                onMouseOver={(e) => this.handlePopoverOpen(e, "Net",
                  powerUsage.buildings.concat(powerGeneration.buildings)
                )}>
                <Number suffix=" W"
                  value={powerGeneration.value - powerUsage.value} />
              </span>
              <Typography>Net</Typography>
            </div>

            <div className={classes.powerText}>
              <Typography className={classes.pointer}
                onMouseOut={this.handlePopoverClose}
                onMouseOver={(e) => this.handlePopoverOpen(e, "Usage", powerUsage.buildings)}>
                {Math.round(powerUsage.value)} W
              </Typography>
              <Typography>Used</Typography>
            </div>

            <Typography>/</Typography>

            <div className={classes.powerText}>
              <Typography className={classes.pointer}
                onMouseOut={this.handlePopoverClose}
                onMouseOver={(e) => this.handlePopoverOpen(e, "Generation", powerGeneration.buildings)}>
                {Math.round(powerGeneration.value)} W
              </Typography>
              <Typography>Generated</Typography>
            </div>

          </div>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = state => {
  return {
    powerGeneration: state.calculator.powerGeneration,
    powerUsage: state.calculator.powerUsage,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Power));