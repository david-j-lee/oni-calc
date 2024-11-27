import IIOEntity from '../../interfaces/IIOEntity';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import IOGridCardSettings from './IOGridCardSettings';
import { MoreVert, Settings } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  css,
  Dialog,
  Grid,
  IconButton,
  Popover,
  Slider,
  Theme,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface IEntityDetailsProps {
  entity: IIOEntity;
  showAllVariants?: boolean;
}

interface IProps {
  record: IIOEntity;
  setQuantity: (name: string, quantity: number) => void;
  setUtilization: (name: string, value: number) => void;
  setVariantUtilization: (name: string, values: number[]) => void;
  RecordDetails: FC<IEntityDetailsProps>;
}

export const GridCard = ({
  record,
  setQuantity: setRecordQuantity,
  setUtilization: setRecordUtilization,
  setVariantUtilization: setRecordVariantUtilization,
  RecordDetails,
}: IProps) => {
  const [quantity, setQuantity] = useState(record.quantity || 0);
  const [utilization, setUtilization] = useState(record.utilization || 0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);
  const utilizationTimer = useRef<number | null>(null);

  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${record.imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [record.imgUrl],
  );

  useEffect(() => {
    setQuantity(record.quantity);
  }, [record.quantity]);

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
        setRecordUtilization(record.name, Math.round(value));
      }, 500);
    },
    [record.name, setRecordUtilization],
  );

  // change quantities
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setRecordQuantity(record.name, quantity + 1);
    }, 500);
  }, [record.name, quantity, setRecordQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setRecordQuantity(record.name, quantity - 1);
      }, 500);
    }
  }, [record.name, quantity, setRecordQuantity]);

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
        setRecordQuantity(record.name, value);
      }, 500);
    },
    [record.name, setRecordQuantity],
  );

  return (
    <Grid
      key={record.name}
      item
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
      css={itemCss}
    >
      <div css={rootCss}>
        <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="lg">
          <DialogCloseIconButton close={handleClose} />
          <RecordDetails entity={record} showAllVariants />
        </Dialog>
        <Dialog open={settingsOpen} onClose={handleSettingsClose}>
          <DialogCloseIconButton close={handleSettingsClose} />
          <IOGridCardSettings
            record={record}
            setUtilization={setRecordUtilization}
            setVariantUtilization={setRecordVariantUtilization}
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
          <RecordDetails entity={record} />
        </Popover>
        <Card css={cardCss}>
          <div
            css={imgWrapperCss}
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
          >
            <div css={[imgCss, backgroundImgCss]} title={record.name} />
          </div>
          <div css={detailsCss}>
            <CardContent css={cardContentCss}>
              <Typography variant="h6" css={cardContentTitleCss}>
                {record.name}
              </Typography>
              {/* div is required to prevent button from stretch in height */}
              <div>
                <IconButton onClick={handleClickOpen} aria-label="More">
                  <MoreVert />
                </IconButton>
              </div>
            </CardContent>
            <CardActions css={actionsCss}>
              {record.variants &&
                record.variants.length > 0 &&
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
                    label="Quantity"
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
    </Grid>
  );
};

const itemCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
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

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 2.5, 1, 1),
  });

const quantityInputCss = (theme: Theme) =>
  css({
    paddingRight: theme.spacing(),
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default GridCard;