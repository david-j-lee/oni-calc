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

export const NavbarGeysers: FC = () => {
  const [, { clearGeyserInputs }] = useContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClearGeyserInputs = () => {
    clearGeyserInputs();
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all of your geyser inputs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleClearGeyserInputs}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Clear all geyser inputs">
        <IconButton
          onClick={handleClickOpen}
          color="inherit"
          aria-label="Clear All Geysers"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default NavbarGeysers;
