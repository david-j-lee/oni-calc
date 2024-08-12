import { useContext } from '../../context/useContext';
import IBuilding from '../../interfaces/IBuilding';
import CapacityBuildings from './CapacityBuildings';
import { css } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';

export const Capacity: FC = () => {
  const [{ powerCapacity, resourcesCapacity }] = useContext();

  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogArray, setDialogArray] = useState<IBuilding[]>([]);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    title: string,
    array: IBuilding[],
  ) => {
    setAnchorEl(event.currentTarget);
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
      <AccordionDetails css={panelDetailsCss}>
        <Popover
          css={popoverCss}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <CapacityBuildings title={dialogTitle} buildings={dialogArray} />
        </Popover>

        <div css={capacityCss}>
          <div css={capacityTextCss}>
            <Typography
              css={pointerCss}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Power', powerCapacity.buildings)
              }
            >
              {powerCapacity.value} kJ
            </Typography>
            <Typography>Power</Typography>
          </div>
          <div css={capacityTextCss}>
            <Typography
              css={pointerCss}
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

const panelDetailsCss = css({
  display: 'flex',
  flexDirection: 'column',
});

const capacityCss = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const capacityTextCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
});

const popoverCss = css({
  pointerEvents: 'none',
});

const pointerCss = css({
  cursor: 'default',
});

export default Capacity;
