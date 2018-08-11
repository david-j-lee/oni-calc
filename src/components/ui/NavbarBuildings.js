import React from 'react';

// redux
import { connect } from 'react-redux';
import {
  clearBuildingInputs,
  setBuildingsLayout,
  collapseBuildingPanels,
  expandBuildingPanels,
} from '../../actions/buildingActions';

// material
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import ClearIcon from '@material-ui/icons/Clear';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

const styles = theme => ({
  root: {},
});

export class NavbarBuildings extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  expandBuildingPanels = () => {
    this.props.expandBuildingPanels();
  };

  collapseBuildingPanels = () => {
    this.props.collapseBuildingPanels();
  };

  setBuildingsLayout = () => {
    this.props.setBuildingsLayout();
  };

  clearBuildingInputs = () => {
    this.props.clearBuildingInputs();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, buildingsLayout } = this.props;
    const buildingLayoutTooltipTitle =
      'Set to ' + (buildingsLayout === 'grid' ? 'table' : 'grid') + ' layout';

    return (
      <div className={classes.root}>
        <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete all of your building inputs?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.clearBuildingInputs}
              color="primary"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Clear all building inputs">
          <IconButton
            onClick={this.handleClickOpen}
            color="inherit"
            aria-label="Clear"
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
        {buildingsLayout === 'grid' && (
          <Tooltip title="Expand all panels">
            <IconButton
              onClick={this.expandBuildingPanels}
              color="inherit"
              aria-label="Expand All"
            >
              <VerticalAlignBottomIcon />
            </IconButton>
          </Tooltip>
        )}
        {buildingsLayout === 'grid' && (
          <Tooltip title="Collapse all panels">
            <IconButton
              onClick={this.collapseBuildingPanels}
              color="inherit"
              aria-label="Collapse All"
            >
              <VerticalAlignTopIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={buildingLayoutTooltipTitle}>
          <IconButton
            onClick={this.setBuildingsLayout}
            color="inherit"
            aria-label="Change Layout"
          >
            {buildingsLayout === 'grid' && <ViewList />}
            {buildingsLayout === 'table' && <ViewModule />}
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buildingsLayout: state.calculator.buildingsLayout,
});

const mapDispatchToProps = {
  clearBuildingInputs,
  setBuildingsLayout,
  collapseBuildingPanels,
  expandBuildingPanels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NavbarBuildings));
