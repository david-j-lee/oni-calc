import { useContext } from '../../context/useContext';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IBuilding from './../../interfaces/IBuilding';
import BuildingDetails from './BuildingDetails';
import { css } from '@emotion/react';
import Settings from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/material/styles';
import { FC, memo, useState, useRef, useCallback, useMemo } from 'react';

interface IProps {
  building: IBuilding;
}

export const BuildingsTableRow: FC<IProps> = memo(({ building }) => {
  const [
    ,
    {
      setBuildingQuantity,
      setBuildingUtilization,
      setBuildingVariantUtilization,
    },
  ] = useContext();

  const [quantity, setQuantity] = useState(building.quantity);
  const [utilization, setUtilization] = useState(building.utilization || 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number>();
  const utilizationTimer = useRef<number>();

  const categoryBackgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${building.categoryImgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [building.categoryImgUrl],
  );

  const buildingBackgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${building.imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [building.imgUrl],
  );

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

  // more info
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

  // quantities
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
    <TableRow>
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
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <BuildingDetails
          building={building}
          setQuantity={setBuildingQuantity}
          setUtilization={setBuildingUtilization}
          setVariantUtilization={setBuildingVariantUtilization}
        />
      </Popover>

      <TableCell size="small">
        <div css={categoryCss}>
          <div css={[categoryImgCss, categoryBackgroundImgCss]} />
          {building.category}
        </div>
      </TableCell>

      <TableCell size="small">
        <div css={buildingCss}>
          <div
            css={[buildingImgCss, buildingBackgroundImgCss]}
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
          />
          {building.name}
        </div>
      </TableCell>

      <TableCell size="small">
        {building.variants &&
          building.variants.length > 0 &&
          building.quantity > 0 && (
            <span css={sliderCss}>
              <Slider
                value={utilization}
                onChange={handleSliderChange}
                valueLabelFormat={(number) => number.toFixed(0) + '%'}
                valueLabelDisplay="auto"
              />
            </span>
          )}
      </TableCell>

      <TableCell align="right" css={quantityCss} size="small">
        <NumberInput
          label="Building Quantity"
          value={quantity}
          onChange={handleChange}
          decrement={decrement}
          increment={increment}
          InputProps={{
            inputProps: {
              style: {
                maxWidth: '100px',
              },
            },
          }}
        />
      </TableCell>

      <TableCell size="small">
        <IconButton onClick={handleClickOpen} aria-label="Settings">
          <Settings />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

const categoryImgCss = (theme: Theme) =>
  css({
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
    cursor: 'default',
  });

const categoryCss = css({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  fontSize: '9pt',
});

const buildingImgCss = (theme: Theme) =>
  css({
    width: 30,
    height: 30,
    marginRight: theme.spacing(),
    cursor: 'default',
  });

const buildingCss = css({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  fontSize: '12pt',
});

const quantityCss = css({
  fontSize: '12pt',
});

const sliderCss = css({
  width: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
});

const popoverCss = css({
  pointerEvents: 'none',
});

export default BuildingsTableRow;
