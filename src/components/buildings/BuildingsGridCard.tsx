import { useContext } from '../../context/useContext';
import IBuilding from './../../interfaces/IBuilding';
import BuildingDetails from './BuildingDetails';
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
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo, useRef, useState, useEffect } from 'react';

interface IProps {
  building: IBuilding;
}

export const BuildingsGridCard: FC<IProps> = memo(({ building }) => {
  const [, { setBuildingQuantity, setBuildingUtilization }] = useContext();

  const [quantity, setQuantity] = useState(building.quantity || 0);
  const [utilization, setUtilization] = useState(building.utilization || 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);
  const utilizationTimer = useRef<number | null>(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setQuantity(building.quantity);
  }, [building.quantity]);

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

  // utilization
  const handleSliderChange = (_event: Event, value: number | number[]) => {
    if (value instanceof Array) {
      return;
    }
    setUtilization(value);
    if (utilizationTimer.current) {
      clearTimeout(utilizationTimer.current);
    }
    utilizationTimer.current = setTimeout(() => {
      setBuildingUtilization(building.name, Math.round(value));
    }, 500);
  };

  // change quantities
  const increment = () => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setBuildingQuantity(building.name, quantity + 1);
    }, 500);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setBuildingQuantity(building.name, quantity - 1);
      }, 500);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueString = event.target.value;
    let value = Number(valueString);
    if (value < 0) value = 0;

    setQuantity(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setBuildingQuantity(building.name, value);
    }, 500);
  };

  const popoverOpen = !!anchorEl;

  return (
    <div css={rootCss} ref={rootRef}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div css={dialogCss}>
          <BuildingDetails building={building} />
          <DialogActions>
            <Button target="_blank" href={building.wikiUrl}>
              WIKI
            </Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
              CLOSE
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Popover
        css={popoverCss}
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
      >
        <BuildingDetails building={building} />
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
              background: `url(${building.imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
            title={building.name}
          />
        </div>
        <div css={detailsCss}>
          <CardContent css={cardContentCss}>
            <Typography variant="subtitle1" css={cardContentTitleCss}>
              {building.name}
            </Typography>
            {/* div is required to prevent button from stretch in height */}
            <div>
              <IconButton onClick={handleClickOpen} aria-label="More">
                <MoreVert />
              </IconButton>
            </div>
          </CardContent>
          <CardActions css={actionsCss}>
            {!building.hasConsistentIO && quantity > 0 && (
              <div css={sliderCss}>
                <Slider value={utilization} onChange={handleSliderChange} />
                <Typography css={sliderLabelCss}>
                  {utilization.toFixed(0) + '%'}
                </Typography>
              </div>
            )}
            <div css={quantityCss}>
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
                css={quantityInputCss}
                InputProps={{
                  inputProps: {
                    style: {
                      textAlign: 'right',
                      fontSize: '1.25rem',
                    },
                    'aria-label': 'Building Quantity',
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
            </div>
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
    display: 'flex',
    paddingRight: theme.spacing(2),
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
    backgroundSize: 'contain',
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
    flexGrow: 1,
    marginRight: theme.spacing(),
    textAlign: 'right',
  });

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  });

const sliderLabelCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(2),
    textAlign: 'right',
    width: 75,
  });

const dialogCss = css({
  maxWidth: 500,
});

const popoverCss = css({
  pointerEvents: 'none',
});

export default BuildingsGridCard;
