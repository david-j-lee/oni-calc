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

export default function NavbarFood() {
  const [, { clearFoodInputs }] = useContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClearFoodInputs = () => {
    clearFoodInputs();
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all of your food inputs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClearFoodInputs}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Clear all food inputs">
        <IconButton
          onClick={handleClickOpen}
          color="inherit"
          aria-label="Clear All Food"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
