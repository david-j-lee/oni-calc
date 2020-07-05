import React, { FC, useState } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CapacityBuildings from './CapacityBuildings';

export const Capacity: FC = () => {
  const classes = useStyles();

  const [{ powerCapacity, resourcesCapacity }] = useContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogArray, setDialogArray] = useState([]);

  const handlePopoverOpen = (event, title, array) => {
    setAnchorEl(event.target);
    setDialogTitle(title);
    setDialogArray(array);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setDialogTitle('');
    setDialogArray([]);
  };

  const dialogOpen = !!anchorEl;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Capacity</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.panelDetails}>
        <Popover
          className={classes.popover}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <CapacityBuildings title={dialogTitle} buildings={dialogArray} />
        </Popover>

        <div className={classes.capacity}>
          <div className={classes.capacityText}>
            <Typography
              className={classes.pointer}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Power', powerCapacity.buildings)
              }
            >
              {powerCapacity.value} kJ
            </Typography>
            <Typography>Power</Typography>
          </div>
          <div className={classes.capacityText}>
            <Typography
              className={classes.pointer}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Resources', resourcesCapacity.buildings)
              }
            >
              {resourcesCapacity.value / 1000} T
            </Typography>
            <Typography>Storage</Typography>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles(() => ({
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  capacity: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  capacityText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  popover: {
    pointerEvents: 'none',
  },
  pointer: {
    cursor: 'default',
  },
}));

export default Capacity;
