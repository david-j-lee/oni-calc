import IBuilding from '../../interfaces/IBuilding';
import { IBuildingsGroupedItem } from '../../interfaces/IBuildingsGrouped';
import BuildingsGridCard from './BuildingsGridCard';
import { css } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo, useEffect, useState } from 'react';

interface IProps {
  group: IBuildingsGroupedItem;
  collapseBuildingPanels: boolean;
  collapseBuildingPanelsTrigger: number;
}

export const BuildingsGridGroup: FC<IProps> = memo(
  ({ group, collapseBuildingPanels, collapseBuildingPanelsTrigger }) => {
    const [expanded, setExpanded] = useState(!collapseBuildingPanels);

    const handleChange = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      setExpanded(!collapseBuildingPanels);
    }, [collapseBuildingPanels, collapseBuildingPanelsTrigger]);

    return (
      <Accordion expanded={expanded} css={accordionCss} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div css={buildingNameCss}>
            <div
              css={imageCss}
              style={{ backgroundImage: `url(${group.image})` }}
            />
            <Typography>{group.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {group.buildings.map((building: IBuilding) => {
              return (
                <Grid
                  item
                  key={building.name}
                  css={buildingCss}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <BuildingsGridCard building={building} />
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  },
);

const accordionCss = (theme: Theme) =>
  css({
    width: '100%',
    background: 'transparent',
    border: `3px solid ${theme.palette.background.paper}`,
  });

const buildingCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  });

const buildingNameCss = css({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
});

const imageCss = (theme: Theme) =>
  css({
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
  });

export default BuildingsGridGroup;
