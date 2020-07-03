import React, { memo, useState, useRef } from 'react';

// material
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';

// component
import PlantFood from './PlantFood';
import PlantDetails from './PlantDetails';

export const Plant = memo(({ plant }) => {
  const classes = useStyles();
  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null);
  const [foodAnchorEl, setFoodAnchorEl] = useState(null);

  const imageUrl = useRef(
    `/images/bio/${plant.name.toLowerCase().split(' ').join('-')}.png`,
  );

  const handleDetailsPopoverOpen = (event) => {
    setDetailsAnchorEl(event.target);
  };

  const handleDetailsPopoverClose = () => {
    setDetailsAnchorEl(null);
  };

  const handleFoodPopoverOpen = (event) => {
    setFoodAnchorEl(event.target);
  };

  const handleFoodPopoverClose = () => {
    setFoodAnchorEl(null);
  };

  const detailsDialogOpen = !!detailsAnchorEl;
  const foodDialogOpen = !!foodAnchorEl;

  return (
    <TableRow className={classes.tableRow}>
      <Popover
        className={classes.popover}
        classes={{ paper: classes.paper }}
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
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={foodDialogOpen}
        anchorEl={foodAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleFoodPopoverClose}
        disableRestoreFocus
      >
        <PlantFood plant={plant} />
      </Popover>

      <TableCell className={classes.tableCell}>
        <div
          className={classes.plantName}
          onMouseOver={handleDetailsPopoverOpen}
          onMouseOut={handleDetailsPopoverClose}
        >
          <div
            className={classes.image}
            style={{
              background: `url(${imageUrl.current}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          {plant.name}
        </div>
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        <div
          className={classes.quantity}
          onMouseOver={handleFoodPopoverOpen}
          onMouseOut={handleFoodPopoverClose}
        >
          {plant.quantity.toLocaleString()}
        </div>
      </TableCell>
    </TableRow>
  );
});

const useStyles = makeStyles((theme) => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
  },
  plantName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'default',
  },
  image: {
    height: 20,
    width: 20,
    backgroundSize: '200%',
    backgroundPosition: 'center',
    marginRight: theme.spacing(),
  },
  quantity: {
    cursor: 'default',
  },
  popover: {
    pointerEvents: 'none',
  },
}));

export default Plant;
