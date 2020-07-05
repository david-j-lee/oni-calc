import React, { FC, memo, useEffect, useState } from 'react';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import BuildingsGridCard from './BuildingsGridCard';

interface IProps {
  group: any;
  collapseBuildingPanels: boolean;
  collapseBuildingPanelsTrigger: number;
}

export const BuildingsGridGroup: FC<IProps> = memo(
  ({ group, collapseBuildingPanels, collapseBuildingPanelsTrigger }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(!collapseBuildingPanels);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      setExpanded(!collapseBuildingPanels);
    }, [collapseBuildingPanels, collapseBuildingPanelsTrigger]);

    return (
      <Accordion
        expanded={expanded}
        className={classes.Accordion}
        onChange={handleChange(group.normalizedName)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.buildingName}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${group.image})` }}
            />
            <Typography>{group.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {group.buildings.map((building) => {
              return (
                <Grid
                  item
                  key={building.name}
                  className={classes.building}
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

const useStyles = makeStyles((theme: Theme) => ({
  Accordion: {
    width: '100%',
    background: 'transparent',
    border: `3px solid ${theme.palette.background.paper}`,
  },
  building: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buildingName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  image: {
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
  },
}));

export default BuildingsGridGroup;
