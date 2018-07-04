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

import Number from "./Number";

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
});

export class Power extends React.Component {
  state = {
    netColor: 'inherit',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.powerUsage > nextProps.powerGeneration) {
      this.setState({ netColor: 'red' });
    } else {
      this.setState({ netColor: 'green' });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Power</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.power}>
            <div className={classes.powerText}>
              <Number suffix=" W"
                value={this.props.powerGeneration - this.props.powerUsage} />
              <Typography>Net</Typography>
            </div>
            <div className={classes.powerText}>
              <Typography>{this.props.powerUsage} W</Typography>
              <Typography>Used</Typography>
            </div>
            <Typography>/</Typography>
            <div className={classes.powerText}>
              <Typography>{this.props.powerGeneration} W</Typography>
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