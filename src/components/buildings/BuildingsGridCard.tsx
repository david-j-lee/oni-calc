import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IBuilding from './../../interfaces/IBuilding';
import BuildingDetails from './BuildingDetails';
import { css } from '@emotion/react';
import MoreVert from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

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

  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${building.imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [building.imgUrl],
  );

  useEffect(() => {
    setQuantity(building.quantity);
  }, [building.quantity]);

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

  // utilization
  const handleSliderChange = useCallback(
    (_event: Event, value: number | number[]) => {
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
    },
    [building.name, setBuildingUtilization],
  );

  // change quantities
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setBuildingQuantity(building.name, quantity + 1);
    }, 500);
  }, [building.name, quantity, setBuildingQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setBuildingQuantity(building.name, quantity - 1);
      }, 500);
    }
  }, [building.name, quantity, setBuildingQuantity]);

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
        setBuildingQuantity(building.name, value);
      }, 500);
    },
    [building.name, setBuildingQuantity],
  );

  return (
    <div css={rootCss}>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogCloseIconButton close={handleClose} />
        <BuildingDetails building={building} showWiki />
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
        <BuildingDetails building={building} />
      </Popover>
      <Card css={cardCss}>
        <div
          css={imgWrapperCss}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        >
          <div css={[imgCss, backgroundImgCss]} title={building.name} />
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
                <Slider
                  value={utilization}
                  onChange={handleSliderChange}
                  valueLabelFormat={(number) => number.toFixed(0) + '%'}
                  valueLabelDisplay="auto"
                />
              </div>
            )}
            <div css={quantityCss}>
              <NumberInput
                label="Building Quantity"
                value={quantity}
                onChange={handleChange}
                decrement={decrement}
                increment={increment}
              />
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

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1, 1, 1),
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default BuildingsGridCard;
