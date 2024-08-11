import { FC, useState } from 'react';
import { useContext } from '../../context/context';

// material
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ViewList from '@mui/icons-material/ViewList';
import ViewModule from '@mui/icons-material/ViewModule';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

export const NavbarBuildings: FC = () => {
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleClearBuildingInputs}
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
