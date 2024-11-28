import IIOEntity from '../../interfaces/IIOEntity';
import DialogCloseIconButton from '../ui/DialogCloseIconButton';
import NumberInput from '../ui/NumberInput';
import { Settings } from '@mui/icons-material';
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

export interface IEntityProps {
  entity: IIOEntity;
  showAllVariants?: boolean;
}

export interface IEntityDetailsProps extends IEntityProps {
  setQuantity: (name: string, value: number) => void;
  setUtilization: (name: string, value: number) => void;
  setVariantUtilization: (name: string, values: number[]) => void;
}

interface IProps {
  entity: IIOEntity;
  setQuantity: (name: string, quantity: number) => void;
  setUtilization: (name: string, value: number) => void;
  setVariantUtilization: (name: string, values: number[]) => void;
  EntityDetails: FC<IEntityDetailsProps>;
}

export const GridCard = ({
  entity,
  setQuantity: setEntityQuantity,
  setUtilization: setEntityUtilization,
  setVariantUtilization: setEntityVariantUtilization,
  EntityDetails,
}: IProps) => {
  const [quantity, setQuantity] = useState(entity.quantity || 0);
  const [utilization, setUtilization] = useState(entity.utilization || 0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const timer = useRef<number | null>(null);
  const utilizationTimer = useRef<number | null>(null);

  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${entity.imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [entity.imgUrl],
  );

  useEffect(() => {
    setQuantity(entity.quantity);
  }, [entity.quantity]);

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
        setEntityUtilization(entity.name, Math.round(value));
      }, 500);
    },
    [entity.name, setEntityUtilization],
  );

  // change quantities
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setEntityQuantity(entity.name, quantity + 1);
    }, 500);
  }, [entity.name, quantity, setEntityQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setEntityQuantity(entity.name, quantity - 1);
      }, 500);
    }
  }, [entity.name, quantity, setEntityQuantity]);

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
        setEntityQuantity(entity.name, value);
      }, 500);
    },
    [entity.name, setEntityQuantity],
  );

  return (
    <Grid
      key={entity.name}
      item
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
      css={itemCss}
    >
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth={entity.variants && entity.variants.length > 0 ? 'lg' : 'sm'}
      >
        <DialogCloseIconButton close={handleClose} />
        <EntityDetails
          entity={entity}
          setQuantity={setEntityQuantity}
          setUtilization={setEntityUtilization}
          setVariantUtilization={setEntityVariantUtilization}
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
        <EntityDetails
          entity={entity}
          setQuantity={setEntityQuantity}
          setUtilization={setEntityUtilization}
          setVariantUtilization={setEntityVariantUtilization}
        />
      </Popover>
      <Card css={cardCss}>
        <div
          css={imgWrapperCss}
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
        >
          <div css={[imgCss, backgroundImgCss]} title={entity.name} />
        </div>
        <div css={detailsCss}>
          <CardContent css={cardContentCss}>
            <Typography variant="h6" css={cardContentTitleCss}>
              {entity.name}
            </Typography>
          </CardContent>
          <CardActions css={actionsCss}>
            {entity.variants && entity.variants.length > 0 && quantity > 0 && (
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
              <IconButton onClick={handleClickOpen} aria-label="More">
                <Settings />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
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

const cardCss = css({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const cardContentCss = (theme: Theme) =>
  css({
    display: 'flex',
    paddingRight: theme.spacing(),
    paddingBottom: 0,
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
    paddingTop: theme.spacing(),
    display: 'flex',
    alignItems: 'center',
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
