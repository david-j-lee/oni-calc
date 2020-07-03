import React, { useState } from 'react';
import { useContext } from '../../context';

// material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

export const NavbarBuildings = () => {
  const [
    { buildingsLayout },
    {
      clearBuildingInputs,
      setBuildingsLayout,
      collapseBuildingPanels,
      expandBuildingPanels,
    },
  ] = useContext();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClearBuildingInputs = () => {
    clearBuildingInputs();
    setDialogOpen(false);
  };

  const buildingLayoutTooltipTitle =
    'Set to ' + (buildingsLayout === 'grid' ? 'table' : 'grid') + ' layout';

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all of your building inputs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClearBuildingInputs}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Clear all building inputs">
        <IconButton
          onClick={handleClickOpen}
          color="inherit"
          aria-label="Clear"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      {buildingsLayout === 'grid' && (
        <Tooltip title="Expand all panels">
          <IconButton
            onClick={expandBuildingPanels}
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
            onClick={collapseBuildingPanels}
            color="inherit"
            aria-label="Collapse All"
          >
            <VerticalAlignTopIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={buildingLayoutTooltipTitle}>
        <IconButton
          onClick={setBuildingsLayout}
          color="inherit"
          aria-label="Change Layout"
        >
          {buildingsLayout === 'grid' && <ViewList />}
          {buildingsLayout === 'table' && <ViewModule />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default NavbarBuildings;
