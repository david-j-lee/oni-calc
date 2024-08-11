import { FC, memo, useEffect, useState, useRef } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

// icons
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import MoreVert from '@mui/icons-material/MoreVert';

import IFood from './../../interfaces/IFood';

// components
import FoodItemDetails from './FoodItemDetails';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';

interface IProps {
  item: IFood;
}

export const FoodItem: FC<IProps> = memo(({ item }) => {
  const [, { setFoodQuantity }] = useContext();

  const [quantity, setQuantity] = useState(item.quantity);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);

  const wikiLink = useRef(WIKI_LINK_PATH + item.name.split(' ').join('_'));

  const imgUrl = useRef(
    `/images/resources/${item.name.toLowerCase().replaceAll(/[ ']/g, '-')}.png`,
  );

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // on hover
  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
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
      setFoodQuantity(item.name, quantity + 1);
    }, 500);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setFoodQuantity(item.name, quantity - 1);
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
      setFoodQuantity(item.name, value);
    }, 500);
  };

  const popoverOpen = !!anchorEl;

  return (
    <div css={rootCss}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <FoodItemDetails item={item} />
        <DialogActions>
          <Button target="_blank" href={wikiLink.current}>
            WIKI
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <Popover
        css={popoverCss}
        open={popoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <FoodItemDetails item={item} />
      </Popover>
      <Card css={cardCss}>
        <CardMedia
          css={coverCss}
          image={imgUrl.current}
          title={item.name}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        />
        <div css={detailsCss}>
          <CardContent css={cardContentCss}>
            <Typography variant="subtitle1" css={cardContentTitleCss}>
              {item.name}
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
                  style: {
                    textAlign: 'right',
                    fontSize: '1.25rem',
                  },
                },
                'aria-label': 'Food Quantity',
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
        </div>
      </Card>
    </div>
  );
});

const rootCss = css({
  height: '100%',
});

const cardCss = css({
  display: 'flex',
  width: '100%',
  height: '100%',
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

const detailsCss = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .MuiIconButton-colorPrimary': {
      color: theme.palette.success[theme.palette.mode],
      '&:hover': {
        backgroundColor: theme.palette.success[theme.palette.mode] + '14', // 14 = 0.08 opacity from the default bg
      },
    },
  });

const coverCss = css({
  width: 60,
  backgroundSize: 'contain',
  backgroundColor: '#3E4357',
  cursor: 'default',
});

const quantityCss = (theme: Theme) =>
  css({
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default FoodItem;
