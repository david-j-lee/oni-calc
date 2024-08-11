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

export const NavbarFood: FC = () => {
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClearFoodInputs} autoFocus>
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
};

export default NavbarFood;
