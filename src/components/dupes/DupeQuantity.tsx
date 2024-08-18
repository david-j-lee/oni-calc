import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import DupeDetails from './DupeDetails';
import { css } from '@emotion/react';
import MoreVert from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useEffect, useState, useRef, useCallback } from 'react';

export const DupeQuantity: FC = () => {
  const [{ dupes }, { setDupesTotalQuantity }] = useContext();

  const [quantity, setQuantity] = useState(dupes.quantity || 0);
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
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDupesTotalQuantity(quantity + 1);
    }, 500);
  }, [quantity, setDupesTotalQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTotalQuantity(quantity - 1);
      }, 500);
    }
  }, [quantity, setDupesTotalQuantity]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number(event.target.value);
      if (value < 0) value = 0;

      setQuantity(value);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupesTotalQuantity(value);
      }, 500);
    },
    [setDupesTotalQuantity],
  );

  useEffect(() => {
    if (dupes.quantity !== null && dupes.quantity !== undefined) {
      setQuantity(dupes.quantity);
    }
  }, [dupes.quantity]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <Dialog
          fullScreen={false}
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogCloseIconButton close={handleClose} />
          <DupeDetails details={dupes} />
        </Dialog>
        <Card css={cardCss}>
          <CardContent css={cardContentCss}>
            <Typography variant="h6" css={cardContentTitleCss}>
              Total Dupes
            </Typography>
            <IconButton onClick={handleClickOpen} aria-label="More">
              <MoreVert />
            </IconButton>
          </CardContent>
          <CardActions>
            <NumberInput
              label="Dupe Quantity"
              value={quantity}
              onChange={handleChange}
              decrement={decrement}
              increment={increment}
            />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

const cardCss = (theme: Theme) =>
  css({
    margin: theme.spacing(),
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

export default DupeQuantity;
