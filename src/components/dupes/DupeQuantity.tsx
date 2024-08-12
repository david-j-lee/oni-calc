import { useContext } from '../../context/context';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import DupeDetails from './DupeDetails';
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
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useEffect, useState, useRef } from 'react';

export const DupeQuantity: FC = () => {
  const [{ dupes }, { setDupesTotalQuantity }] = useContext();

  const [quantity, setQuantity] = useState(dupes.quantity || 0);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;

    setQuantity(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDupesTotalQuantity(value);
    }, 500);
  };

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
          <DupeDetails details={dupes} />
          <DialogActions>
            <Button target="_blank" href={`${WIKI_LINK_PATH}Duplicant`}>
              WIKI
            </Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
              CLOSE
            </Button>
          </DialogActions>
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

const quantityCss = (theme: Theme) =>
  css({
    flexGrow: 1,
    marginRight: theme.spacing(),
  });

export default DupeQuantity;
