import { useContext } from '../../context/useContext';
import IIOEntity from '../../interfaces/IIOEntity';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import CritterDetails from './CritterDetails';
import { MoreVert, Settings } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  css,
  Dialog,
  IconButton,
  Popover,
  Theme,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface IProps {
  critter: IIOEntity;
}

export const Critter = ({ critter }: IProps) => {
  const [, { setCritterQuantity }] = useContext();

  const [quantity, setQuantity] = useState(critter.quantity || 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);

  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${critter.imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [critter.imgUrl],
  );

  useEffect(() => {
    setQuantity(critter.quantity);
  }, [critter.quantity]);

  // on hover
  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // open dialog
  const handleClickOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  // open settings
  const handleClickSettingsOpen = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const handleSettingsClose = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  // change quantities
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setCritterQuantity(critter.name, quantity + 1);
    }, 500);
  }, [critter.name, quantity, setCritterQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setCritterQuantity(critter.name, quantity - 1);
      }, 500);
    }
  }, [critter.name, quantity, setCritterQuantity]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueString = event.target.value;
      let value = Number(valueString);
      if (value < 0) value = 0;

      setQuantity(value);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setCritterQuantity(critter.name, value);
      }, 500);
    },
    [critter.name, setCritterQuantity],
  );

  return (
    <div css={rootCss}>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogCloseIconButton close={handleClose} />
        <CritterDetails critter={critter} />
      </Dialog>
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <DialogCloseIconButton close={handleSettingsClose} />
        {/* TODO: Add settings here */}
      </Dialog>
      <Popover
        css={popoverCss}
        open={Boolean(anchorEl)}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
      >
        <CritterDetails critter={critter} />
      </Popover>
      <Card css={cardCss}>
        <div
          css={imgWrapperCss}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        >
          <div css={[imgCss, backgroundImgCss]} title={critter.name} />
        </div>
        <div css={detailsCss}>
          <CardContent css={cardContentCss}>
            <Typography variant="h6" css={cardContentTitleCss}>
              {critter.name}
            </Typography>
            {/* div is required to prevent button from stretch in height */}
            <div>
              <IconButton onClick={handleClickOpen} aria-label="More">
                <MoreVert />
              </IconButton>
            </div>
          </CardContent>
          <CardActions css={actionsCss}>
            <div css={quantityCss}>
              <div css={quantityInputCss}>
                <NumberInput
                  label="Building Quantity"
                  value={quantity}
                  onChange={handleChange}
                  decrement={decrement}
                  increment={increment}
                />
              </div>
              <IconButton onClick={handleClickSettingsOpen} aria-label="More">
                <Settings />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

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
    display: 'flex',
    paddingRight: theme.spacing(),
    flexGrow: 1,
  });

const cardContentTitleCss = css({
  flexGrow: 1,
});

const detailsCss = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
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
    backgroundColor: '#3E4357',
    cursor: 'default',
  });

const actionsCss = css({
  flexDirection: 'column',
});

const quantityCss = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    '& .MuiIconButton-colorPrimary': {
      color: theme.palette.success[theme.palette.mode],
      '&:hover': {
        backgroundColor: theme.palette.success[theme.palette.mode] + '14', // 14 = 0.08 opacity from the default bg
      },
    },
  });

const quantityInputCss = (theme: Theme) =>
  css({
    paddingRight: theme.spacing(),
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default Critter;
