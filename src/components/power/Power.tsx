import { useContext } from '../../context/useContext';
import IBuilding from '../../interfaces/IBuilding';
import Number from '../ui/Number';
import PowerBuildings from './PowerBuildings';
import { css } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useState } from 'react';

export const Power: FC = () => {
  const [{ powerGeneration, powerUsage }] = useContext();

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
        <Typography>Power</Typography>
      </AccordionSummary>
      <AccordionDetails css={accordionDetailsCss} className="styled-scrollbar">
        <Popover
          css={popoverCss}
          open={dialogOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <PowerBuildings title={dialogTitle} buildings={dialogArray} />
        </Popover>

        <div css={powerCss}>
          <div css={powerTextCss}>
            <Typography
              css={valueCss}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Generation', powerGeneration.buildings)
              }
            >
              {Math.round(powerGeneration.value).toLocaleString()} W
            </Typography>
            <Typography>Generated</Typography>
          </div>

          <Typography variant="h5">-</Typography>

          <div css={powerTextCss}>
            <Typography
              css={valueCss}
              onMouseOut={handlePopoverClose}
              onMouseOver={(e) =>
                handlePopoverOpen(e, 'Usage', powerUsage.buildings)
              }
            >
              {Math.round(powerUsage.value).toLocaleString()} W
            </Typography>
            <Typography>Used</Typography>
          </div>

          <Typography variant="h5">=</Typography>

          <div css={powerTextCss}>
            <div
              css={valueCss}
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
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const powerCss = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const powerTextCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
});

const popoverCss = css({
  pointerEvents: 'none',
});

const valueCss = (theme: Theme) =>
  css({
    cursor: 'default',
    whiteSpace: 'nowrap',
    padding: theme.spacing(),
  });

const accordionDetailsCss = css({
  overflowX: 'auto',
  overflowY: 'hidden',
});

export default Power;
