import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IFood from './../../interfaces/IFood';
import FoodItemDetails from './FoodItemDetails';
import { css } from '@emotion/react';
import MoreVert from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo, useEffect, useState, useRef, useMemo } from 'react';

interface IProps {
  item: IFood;
}

export const FoodItem: FC<IProps> = memo(({ item }) => {
  const [, { setFoodQuantity }] = useContext();

  const [quantity, setQuantity] = useState(item.quantity);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);

  const imgUrl = useMemo(
    () =>
      `/images/resources/${item.name.toLowerCase().replaceAll(/[ ']/g, '-')}.png`,
    [item],
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
        <DialogCloseIconButton close={handleClose} />
        <FoodItemDetails item={item} showWiki={true} />
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
        <div
          css={imgWrapperCss}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        >
          <div
            css={imgCss}
            style={{
              background: `url(${imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
            title={item.name}
          />
        </div>
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
            <NumberInput
              label="Food Quantity"
              value={quantity}
              onChange={handleChange}
              decrement={decrement}
              increment={increment}
            />
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

const imgWrapperCss = css({
  backgroundColor: '#3E4357',
});

const imgCss = (theme: Theme) =>
  css({
    width: 40,
    height: '100%',
    margin: theme.spacing(),
    pointerEvents: 'none',
    backgroundSize: 'contain',
    backgroundColor: '#3E4357',
    cursor: 'default',
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default FoodItem;
