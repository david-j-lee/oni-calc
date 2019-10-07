import React, { useState, useRef } from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import FoodItemDetails from './FoodItemDetails';

export default function FoodItem({ item }) {
  const classes = useStyles();

  const [, { setFoodQuantity }] = useContext();

  const [quantity, setQuantity] = useState(item.quantity);
  const [focused, setFocused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const timer = useRef();

  // on hover
  const handlePopoverOpen = event => {
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

  // change quantities
  const increment = () => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setFoodQuantity(item.name, quantity);
    }, 500);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setFoodQuantity(item.name, quantity);
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
      setFoodQuantity(item.name, value);
    }, 500);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const popoverOpen = !!anchorEl;

  const wikiLink = `https://oxygennotincluded.gamepedia.com/${item.name
    .toLowerCase()
    .split(' ')
    .join('-')}`;

  const imgUrl = `/images/resources/${item.name
    .toLowerCase()
    .split(' ')
    .join('-')}.png`;

  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <FoodItemDetails item={item} />
        <DialogActions>
          <Button target="_blank" href={wikiLink} color="primary">
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
      </Dialog>
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
        <FoodItemDetails item={item} />
      </Popover>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={imgUrl}
          title={item.name}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        />
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="subtitle1"
              className={classes.cardContentTitle}
            >
              {item.name}
            </Typography>
            <IconButton onClick={handleClickOpen} aria-label="More">
              <MoreVert />
            </IconButton>
          </CardContent>
          <CardActions>
            <IconButton
              color="secondary"
              className={classes.button}
              aria-label="Decrement"
              onClick={decrement}
            >
              <ArrowDropDown />
            </IconButton>
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
                    fontSize: '1.25rem',
                    width: '25px',
                  },
                },
                'aria-label': 'Food Quantity',
              }}
            >
              {quantity}
            </TextField>
            <IconButton
              color="primary"
              className={classes.button}
              aria-label="Increment"
              onClick={increment}
            >
              <ArrowDropUp />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing(2),
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cover: {
    width: 60,
    backgroundSize: 'contain',
    backgroundColor: '#3E4357',
    cursor: 'default',
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  },
  dialog: {
    maxWidth: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
}));
