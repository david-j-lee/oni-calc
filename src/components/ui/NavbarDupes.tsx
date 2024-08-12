import { useContext } from '../../context/useContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FC, useState } from 'react';

export const NavbarDupes: FC = () => {
  const [, { clearDupeInputs }] = useContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClearDupeInputs = () => {
    clearDupeInputs();
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all of your dupe inputs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClearDupeInputs} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Clear all dupe inputs">
        <IconButton
          onClick={handleClickOpen}
          color="inherit"
          aria-label="Clear All Dupes"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default NavbarDupes;
