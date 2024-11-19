import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IDupeTrait from './../../interfaces/IDupeTrait';
import DupeTraitDetails from './DupeTraitDetails';
import { css } from '@emotion/react';
import MoreVert from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useState, useRef, useEffect, useCallback } from 'react';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTrait: FC<IProps> = ({ trait }) => {
  const [{ dupes }, { setDupesTraitQuantity }] = useContext();

  const [quantity, setQuantity] = useState(trait.quantity || 0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const timer = useRef<number | null>(null);

  // open dialog
  const handleClickOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  // change quantities
  const increment = useCallback(() => {
    if (quantity < dupes.quantity) {
      setQuantity(quantity + 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTraitQuantity(trait.name, quantity + 1);
      }, 500);
    }
  }, [trait.name, dupes.quantity, quantity, setDupesTraitQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTraitQuantity(trait.name, quantity - 1);
      }, 500);
    }
  }, [trait.name, quantity, setDupesTraitQuantity]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number(event.target.value);
      if (value < 0) value = 0;

      setQuantity(value);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTraitQuantity(trait.name, value);
      }, 500);
    },
    [trait.name, setDupesTraitQuantity],
  );

  useEffect(() => {
    setQuantity(trait.quantity);
  }, [trait]);

  return (
    <div css={rootCss}>
      <Dialog fullScreen={false} open={dialogOpen} onClose={handleClose}>
        <DialogCloseIconButton close={handleClose} />
        <DupeTraitDetails trait={trait} />
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
          <NumberInput
            label="Dupe Trait Quantity"
            value={quantity}
            onChange={handleChange}
            decrement={decrement}
            increment={increment}
          />
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

export default DupeTrait;
