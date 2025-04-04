import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IBuilding from './../../interfaces/IBuilding';
import BuildingDetails from './BuildingDetails';
import { css } from '@emotion/react';
import Settings from '@mui/icons-material/Settings';
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

export const BuildingsGridCard: FC<IProps> = memo(({ building }: IProps) => {
  const [
    ,
    {
      setBuildingQuantity,
      setBuildingUtilization,
      setBuildingVariantUtilization,
    },
  ] = useContext();

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
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth={
          building.variants && building.variants.length > 0 ? 'lg' : 'sm'
        }
      >
        <DialogCloseIconButton close={handleClose} />
        <BuildingDetails
          building={building}
          setQuantity={setBuildingQuantity}
          setUtilization={setBuildingUtilization}
          setVariantUtilization={setBuildingVariantUtilization}
          showWiki
          showAllVariants
        />
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
        <BuildingDetails
          building={building}
          setQuantity={setBuildingQuantity}
          setUtilization={setBuildingUtilization}
          setVariantUtilization={setBuildingVariantUtilization}
        />
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
            <Typography variant="h6" css={cardContentTitleCss}>
              {building.name}
            </Typography>
          </CardContent>
          <CardActions css={actionsCss}>
            {building.variants &&
              building.variants.length > 0 &&
              quantity > 0 && (
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
              <div css={quantityInputCss}>
                <NumberInput
                  label="Building Quantity"
                  value={quantity}
                  onChange={handleChange}
                  decrement={decrement}
                  increment={increment}
                />
              </div>
              <IconButton onClick={handleClickOpen} aria-label="More">
                <Settings />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
});

BuildingsGridCard.displayName = 'BuildingsGridCard';

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

const quantityCss = css({
  display: 'flex',
  alignItems: 'center',
});

const quantityInputCss = (theme: Theme) =>
  css({
    paddingRight: theme.spacing(),
  });

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 2.5, 1, 1),
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default BuildingsGridCard;
