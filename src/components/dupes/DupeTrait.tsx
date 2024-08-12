import { useContext } from '../../context/useContext';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import IDupeTrait from './../../interfaces/IDupeTrait';
import DupeTraitDetails from './DupeTraitDetails';
import { css } from '@emotion/react';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import MoreVert from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useState, useRef, useEffect } from 'react';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTrait: FC<IProps> = ({ trait }) => {
  const [{ dupes }, { setDupesTraitQuantity }] = useContext();

  const [quantity, setQuantity] = useState(trait.quantity || 0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const timer = useRef<number | null>(null);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;

    setQuantity(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDupesTraitQuantity(trait.name, value);
    }, 500);
  };

  useEffect(() => {
    setQuantity(trait.quantity);
  }, [trait]);

  return (
    <div css={rootCss}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DupeTraitDetails trait={trait} />
        <DialogActions>
          <Button target="_blank" href={`${WIKI_LINK_PATH}Duplicant#Traits`}>
            WIKI
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent css={cardContentCss}>
          <Typography variant="subtitle1" css={cardContentTitleCss}>
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
            css={quantityCss}
            InputProps={{
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

const rootCss = (theme: Theme) =>
  css({
    height: '100%',
    '& .MuiIconButton-colorPrimary': {
      color: theme.palette.success[theme.palette.mode],
      '&:hover': {
        backgroundColor: theme.palette.success[theme.palette.mode] + '14', // 14 = 0.08 opacity from the default bg
      },
    },
  });

const cardContentCss = (theme: Theme) =>
  css({
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing(2),
  });

const cardContentTitleCss = css({
  flexGrow: 1,
});

const quantityCss = (theme: Theme) =>
  css({
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  });

export default DupeTrait;
