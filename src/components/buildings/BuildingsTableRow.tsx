import { useContext } from '../../context/context';
import IBuilding from './../../interfaces/IBuilding';
import BuildingDetails from './BuildingDetails';
import { css } from '@emotion/react';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo, useState, useRef } from 'react';

interface IProps {
  building: IBuilding;
}

export const BuildingsTableRow: FC<IProps> = memo(({ building }) => {
  const [, { setBuildingUtilization, setBuildingQuantity }] = useContext();

  const [quantity, setQuantity] = useState(building.quantity);
  const [utilization, setUtilization] = useState(building.utilization || 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number>();
  const utilizationTimer = useRef<number>();

  // on hover
  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // more info
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

  // quantities
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
    <TableRow>
      <Popover
        css={popoverCss}
        open={popoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <BuildingDetails building={building} />
      </Popover>

      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div>
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

      <TableCell size="small">
        <div css={categoryCss}>
          <div
            css={categoryImgCss}
            style={{
              background: `url(${building.categoryImgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {building.category}
        </div>
      </TableCell>

      <TableCell size="small">
        <div css={buildingCss}>
          <div
            css={buildingImgCss}
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
            style={{
              background: `url(${building.imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {building.name}
        </div>
      </TableCell>

      <TableCell size="small">
        {!building.hasConsistentIO && building.quantity > 0 && (
          <span css={sliderCss}>
            <Slider value={utilization} onChange={handleSliderChange} />
            <Typography css={sliderLabelCss}>
              {utilization.toFixed(0) + '%'}
            </Typography>
          </span>
        )}
      </TableCell>

      <TableCell align="right" css={quantityCss} size="small">
        <TextField
          type="number"
          value={quantity}
          onChange={handleChange}
          css={quantityCss}
          InputProps={{
            inputProps: {
              style: {
                textAlign: 'right',
                maxWidth: '100px',
                fontSize: '1.25rem',
              },
              'aria-label': 'Building Quantity',
            },
          }}
        >
          {quantity}
        </TextField>
      </TableCell>

      <TableCell size="small">
        <div css={actionsCss}>
          <IconButton
            color="secondary"
            aria-label="Decrement"
            onClick={decrement}
          >
            <ArrowDropDown />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Increment"
            onClick={increment}
          >
            <ArrowDropUp />
          </IconButton>
          <IconButton onClick={handleClickOpen} aria-label="More">
            <MoreHoriz />
          </IconButton>
        </div>
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

const actionsCss = css({
  whiteSpace: 'nowrap',
});

const sliderCss = css({
  width: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
});

const sliderLabelCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(2),
    textAlign: 'right',
    width: 75,
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default BuildingsTableRow;
