import IPlant from './../../interfaces/IPlant';
import PlantDetails from './PlantDetails';
import PlantFood from './PlantFood';
import { css } from '@emotion/react';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/material/styles';
import { FC, memo, useState, useRef } from 'react';

interface IProps {
  plant: IPlant;
}

export const Plant: FC<IProps> = memo(({ plant }) => {
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<HTMLDivElement | null>(
    null,
  );
  const [foodAnchorEl, setFoodAnchorEl] = useState<HTMLDivElement | null>(null);

  const imageUrl = useRef(
    `/images/bio/${plant.name.toLowerCase().split(' ').join('-')}.png`,
  );

  const handleDetailsPopoverOpen = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setDetailsAnchorEl(event.currentTarget);
  };

  const handleDetailsPopoverClose = () => {
    setDetailsAnchorEl(null);
  };

  const handleFoodPopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setFoodAnchorEl(event.currentTarget);
  };

  const handleFoodPopoverClose = () => {
    setFoodAnchorEl(null);
  };

  const detailsDialogOpen = !!detailsAnchorEl;
  const foodDialogOpen = !!foodAnchorEl;

  return (
    <TableRow css={tableRowCss}>
      <Popover
        css={popoverCss}
        open={detailsDialogOpen}
        anchorEl={detailsAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleDetailsPopoverClose}
        disableRestoreFocus
      >
        <PlantDetails plant={plant} />
      </Popover>
      <Popover
        css={popoverCss}
        open={foodDialogOpen}
        anchorEl={foodAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleFoodPopoverClose}
        disableRestoreFocus
      >
        <PlantFood plant={plant} />
      </Popover>

      <TableCell css={tableCellCss}>
        <div
          css={plantNameCss}
          onMouseOver={handleDetailsPopoverOpen}
          onMouseOut={handleDetailsPopoverClose}
        >
          <div
            css={imageCss}
            style={{
              background: `url(${imageUrl.current}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {plant.name}
        </div>
      </TableCell>
      <TableCell align="right" css={tableCellCss}>
        <div
          css={plant.quantity ? quantityCss : emptyQuantityCss}
          onMouseOver={handleFoodPopoverOpen}
          onMouseOut={handleFoodPopoverClose}
        >
          {plant.quantity.toLocaleString()}
        </div>
      </TableCell>
    </TableRow>
  );
});

const tableRowCss = css({
  height: 'inherit',
});

const tableCellCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

const plantNameCss = css({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  cursor: 'default',
});

const imageCss = (theme: Theme) =>
  css({
    height: 20,
    width: 20,
    backgroundSize: '200%',
    backgroundPosition: 'center',
    marginRight: theme.spacing(),
  });

const quantityCss = css({
  cursor: 'default',
});

const emptyQuantityCss = (theme: Theme) =>
  css({
    cursor: 'default',
    color: theme.palette.text.disabled,
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default Plant;
