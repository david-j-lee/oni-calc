import React, { FC, memo, useRef, useState, useEffect } from 'react';
import { useContext } from '../../context';

// material
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

import IBuilding from './../../interfaces/IBuilding';

// component
import BuildingDetails from './BuildingDetails';

interface IProps {
  building: IBuilding;
}

export const BuildingsGridCard: FC<IProps> = memo(({ building }) => {
  const classes = useStyles();

  const [, { setBuildingQuantity, setBuildingUtilization }] = useContext();

  const [quantity, setQuantity] = useState(building.quantity || 0);
  const [utilization, setUtilization] = useState(building.utilization || 0);
  const [focused, setFocused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const timer = useRef<any | null>(null);
  const utilizationTimer = useRef<any | null>(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setQuantity(building.quantity);
  }, [building.quantity]);

  // on hover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // open dialog
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

  // change quantities
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

  const handleChange = (event) => {
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
    setFocused(true);
  };

  const popoverOpen = !!anchorEl;

  return (
    <div className={classes.root} ref={rootRef}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.dialog}>
          <BuildingDetails building={building} />
          <DialogActions>
            <Button target="_blank" href={building.wikiUrl} color="default">
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
      <Popover
        className={classes.popover}
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
      >
        <BuildingDetails building={building} />
      </Popover>
      <Card className={classes.card}>
        <div
          className={classes.imgWrapper}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        >
          <div
            className={classes.img}
            style={{
              background: `url(${building.imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
            title={building.name}
          />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="subtitle1"
              className={classes.cardContentTitle}
            >
              {building.name}
            </Typography>
            {/* div is required to prevent button from stretch in height */}
            <div>
              <IconButton onClick={handleClickOpen} aria-label="More">
                <MoreVert />
              </IconButton>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            {!building.hasConsistentIO && quantity > 0 && (
              <div className={classes.slider}>
                <Slider value={utilization} onChange={handleSliderChange} />
                <Typography className={classes.sliderLabel}>
                  {utilization.toFixed(0) + '%'}
                </Typography>
              </div>
            )}
            <div className={classes.quantity}>
              <IconButton
                color="secondary"
                aria-label="Decrement"
                onClick={decrement}
              >
                <ArrowDropDown />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                onChange={handleChange}
                className={classes.quantityInput}
                onFocus={onFocus}
                onBlur={onBlur}
                InputProps={{
                  disableUnderline: !focused,
                  inputProps: {
                    style: {
                      textAlign: 'right',
                      fontSize: '1.25rem',
                    },
                    'aria-label': 'Building Quantity',
                  },
                }}
              >
                {quantity}
              </TextField>
              <IconButton
                color="primary"
                aria-label="Increment"
                onClick={increment}
              >
                <ArrowDropUp />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    paddingRight: theme.spacing(2),
    flexGrow: 1,
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  imgWrapper: {
    backgroundColor: '#3E4357',
  },
  img: {
    width: 40,
    height: '100%',
    margin: theme.spacing(),
    pointerEvents: 'none',
    backgroundSize: 'contain',
    backgroundColor: '#3E4357',
    cursor: 'default',
  },
  actions: {
    flexDirection: 'column',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityInput: {
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  },
  category: {
    display: 'flex',
    alignItems: 'center',
  },
  categoryImage: {
    display: 'inline-block',
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
  },
  slider: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  },
  sliderLabel: {
    paddingLeft: theme.spacing(2),
    textAlign: 'right',
    width: 75,
  },
  dialog: {
    maxWidth: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
}));

export default BuildingsGridCard;
