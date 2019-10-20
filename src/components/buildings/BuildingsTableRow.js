import React, { useState, useRef } from 'react';
import { useContext } from '../../context';

// material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

// component
import BuildingDetails from './BuildingDetails';

export default function BuildingsTable({ building }) {
  const classes = useStyles();

  const [, { setBuildingUtilization, setBuildingQuantity }] = useContext();

  const [quantity, setQuantity] = useState(building.quantity);
  const [focused, setFocused] = useState(false);
  const [utilization, setUtilization] = useState(building.utilization || 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const timer = useRef();
  const utilizationTimer = useRef();

  // on hover
  const handlePopoverOpen = event => {
    setAnchorEl(event.target);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // more info
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // utilization
  const handleSliderChange = (event, value) => {
    setUtilization(value);
    if (utilizationTimer.current) {
      clearTimeout(utilizationTimer.current);
    }
    utilizationTimer.current = setTimeout(() => {
      setBuildingUtilization(building.name, Math.round(value));
    }, 500);
  };

  // quantities
  const increment = () => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setBuildingQuantity(building.name, quantity + 1);
    }, 500);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setBuildingQuantity(building.name, quantity - 1);
      }, 500);
    }
  };

  const handleChange = event => {
    let value = event.target.value;
    value = Number(value);
    if (value < 0) value = 0;

    setQuantity(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setBuildingQuantity(building.name, value);
    }, 500);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(false);
  };

  const popoverOpen = !!anchorEl;

  return (
    <TableRow>
      <Popover
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={popoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <BuildingDetails building={building} />
      </Popover>

      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.dialog}>
          <BuildingDetails building={building} />
          <DialogActions>
            <Button target="_blank" href={building.wikLink} color="primary">
              WIKI
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              CLOSE
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <TableCell size="small">
        <div className={classes.category}>
          <div
            className={classes.categoryImg}
            style={{
              background: `url(${building.categoryImgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {building.category}
        </div>
      </TableCell>

      <TableCell size="small">
        <div className={classes.building}>
          <div
            className={classes.buildingImg}
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
            style={{
              background: `url(${building.imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {building.name}
        </div>
      </TableCell>

      <TableCell size="small">
        {!building.hasConsistentIO && building.quantity > 0 && (
          <span className={classes.slider}>
            <Slider value={utilization} onChange={handleSliderChange} />
            <Typography className={classes.sliderLabel}>
              {utilization.toFixed(0) + '%'}
            </Typography>
          </span>
        )}
      </TableCell>

      <TableCell align="right" className={classes.quantity} size="small">
        <TextField
          type="number"
          value={quantity}
          onChange={handleChange}
          className={classes.quantity}
          onFocus={onFocus}
          onBlur={onBlur}
          InputProps={{
            disableUnderline: !focused,
            inputProps: {
              style: {
                textAlign: 'right',
                maxWidth: '100px',
                fontSize: '1.25rem',
              },
              'aria-label': 'Building Quantity',
            },
          }}
        >
          {quantity}
        </TextField>
      </TableCell>

      <TableCell size="small">
        <div className={classes.actions}>
          <IconButton
            color="secondary"
            className={classes.button}
            aria-label="Decrement"
            onClick={decrement}
          >
            <ArrowDropDown />
          </IconButton>
          <IconButton
            color="primary"
            className={classes.button}
            aria-label="Increment"
            onClick={increment}
          >
            <ArrowDropUp />
          </IconButton>
          <IconButton onClick={handleClickOpen} aria-label="More">
            <MoreHoriz />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles(theme => ({
  image: {
    width: 40,
    height: 40,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
  },
  categoryImg: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
    cursor: 'default',
  },
  category: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '9pt',
  },
  buildingImg: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(),
    cursor: 'default',
  },
  building: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '12pt',
  },
  quantity: {
    fontSize: '12pt',
  },
  actions: {
    whiteSpace: 'nowrap',
  },
  slider: {
    width: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },
  sliderLabel: {
    paddingLeft: theme.spacing(2),
    textAlign: 'right',
    width: 75,
  },
  popover: {
    pointerEvents: 'none',
  },
}));
