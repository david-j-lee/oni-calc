import React, { FC, useState } from 'react';
import { useContext } from '../../context';

// material
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import Number from '../common/Number';
import PowerBuildings from './PowerBuildings';

export const Power: FC = () => {
  const classes = useStyles();
  const [{ powerGeneration, powerUsage }] = useContext();

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
        <Typography>Power</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Popover
          className={classes.popover}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <PowerBuildings title={dialogTitle} buildings={dialogArray} />
        </Popover>

        <div className={classes.power}>
          <div className={classes.powerText}>
            <div
              className={classes.pointer}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(
                  e,
                  'Net',
                  powerUsage.buildings.concat(powerGeneration.buildings),
                )
              }
            >
              <Number
                suffix=" W"
                value={powerGeneration.value - powerUsage.value}
              />
            </div>
            <Typography>Net</Typography>
          </div>

          <div className={classes.powerText}>
            <Typography
              className={classes.pointer}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Usage', powerUsage.buildings)
              }
            >
              {Math.round(powerUsage.value).toLocaleString()} W
            </Typography>
            <Typography>Used</Typography>
          </div>

          <Typography>/</Typography>

          <div className={classes.powerText}>
            <Typography
              className={classes.pointer}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Generation', powerGeneration.buildings)
              }
            >
              {Math.round(powerGeneration.value).toLocaleString()} W
            </Typography>
            <Typography>Generated</Typography>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles(() => ({
  power: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  powerText: {
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

export default Power;
