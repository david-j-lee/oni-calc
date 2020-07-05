import React, { FC, useEffect, useState, useRef } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import DupeDetails from './DupeDetails';

export const DupeQuantity: FC = () => {
  const classes = useStyles();

  const [{ dupes }, { setDupesTotalQuantity }] = useContext();

  const [quantity, setQuantity] = useState(dupes.quantity || 0);
  const [focused, setFocused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const timer = useRef<any>(null);

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
      setDupesTotalQuantity(quantity + 1);
    }, 500);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTotalQuantity(quantity - 1);
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
      setDupesTotalQuantity(value);
    }, 500);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  useEffect(() => {
    if (dupes.quantity !== null && dupes.quantity !== undefined) {
      setQuantity(dupes.quantity);
    }
  }, [dupes.quantity]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <Dialog
          fullScreen={false}
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DupeDetails details={dupes} />
          <DialogActions>
            <Button
              target="_blank"
              href="https://oxygennotincluded.gamepedia.com/duplicant"
              color="primary"
            >
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
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardContentTitle}>
              Total Dupes
            </Typography>
            <IconButton onClick={handleClickOpen} aria-label="More">
              <MoreVert />
            </IconButton>
          </CardContent>
          <CardActions>
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
              className={classes.quantity}
              onFocus={onFocus}
              onBlur={onBlur}
              InputProps={{
                disableUnderline: !focused,
                inputProps: {
                  style: { textAlign: 'right', fontSize: '1.25rem' },
                  'aria-label': 'Dupe Quantity',
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
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  card: {
    margin: theme.spacing(),
  },
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing(2),
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing(),
  },
}));

export default DupeQuantity;
