import IPlant from './../../interfaces/IPlant';
import PlantDetails from './PlantDetails';
import PlantFood from './PlantFood';
import { css } from '@emotion/react';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/material/styles';
import { FC, memo, useState, useMemo, useCallback } from 'react';

interface IProps {
  plant: IPlant;
}

export const Plant: FC<IProps> = memo(({ plant }) => {
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<HTMLDivElement | null>(
    null,
  );
  const [foodAnchorEl, setFoodAnchorEl] = useState<HTMLDivElement | null>(null);

  const backgroundImgCss = useMemo(() => {
    const imgUrl = `/images/bio/${plant.name.toLowerCase().split(' ').join('-')}.png`;
    return css({
      background: `url(${imgUrl}) no-repeat center center`,
      backgroundSize: 'contain',
    });
  }, [plant.name]);

  const handleDetailsPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setDetailsAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleDetailsPopoverClose = useCallback(() => {
    setDetailsAnchorEl(null);
  }, []);

  const handleFoodPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setFoodAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleFoodPopoverClose = useCallback(() => {
    setFoodAnchorEl(null);
  }, []);

  return (
    <TableRow css={tableRowCss}>
      <Popover
        css={popoverCss}
        open={Boolean(detailsAnchorEl)}
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
        open={Boolean(foodAnchorEl)}
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
          <div css={[imageCss, backgroundImgCss]} />
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
