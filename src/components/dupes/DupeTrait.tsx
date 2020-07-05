import React, { FC, useState, useRef, useEffect } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import DupeTraitDetails from './DupeTraitDetails';
import IDupeTrait from './../../interfaces/IDupeTrait';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTrait: FC<IProps> = ({ trait }) => {
  const classes = useStyles();
  const [{ dupes }, { setDupesTraitQuantity }] = useContext();

  const [quantity, setQuantity] = useState(trait.quantity || 0);
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
    if (quantity < dupes.quantity) {
      setQuantity(quantity + 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTraitQuantity(trait.name, quantity + 1);
      }, 500);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTraitQuantity(trait.name, quantity - 1);
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
      setDupesTraitQuantity(trait.name, value);
    }, 500);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  useEffect(() => {
    setQuantity(trait.quantity);
  }, [trait]);

  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DupeTraitDetails trait={trait} />
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
      <Card>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" className={classes.cardContentTitle}>
            {trait.name}
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
                'aria-label': 'Dupe Trait Quantity',
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
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  },
}));

export default DupeTrait;
