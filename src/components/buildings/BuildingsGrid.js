import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles } from '@material-ui/styles';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import BuildingsGridCard from './BuildingsGridCard';

export default function BuildingsGrid() {
  const classes = useStyles();

  const [
    { buildings, collapseBuildingPanels, collapseBuildingPanelsTrigger },
  ] = useContext();

  const [groupedBuildings, setGroupedBuildings] = useState([]);
  const [expansionPanelStates, setExpansionPanelStates] = useState(null);

  const handleChange = panel => (event, expanded) => {
    setExpansionPanelStates({
      ...expansionPanelStates,
      [panel]: !expansionPanelStates[panel],
    });
  };

  useEffect(() => {
    if (buildings) {
      const getGroupedBuildings = () => {
        const groups = buildings.reduce((a, b) => {
          a[b.category] = a[b.category] || [];
          a[b.category].push(b);
          return a;
        }, {});
        return Object.keys(groups).map(group => ({
          name: group,
          buildings: groups[group],
        }));
      };
      setGroupedBuildings(getGroupedBuildings());
    }
  }, [buildings]);

  useEffect(() => {
    setExpansionPanelStates(states => {
      const newStates = { ...states };
      groupedBuildings.forEach(group => {
        const normalizedName = group.name
          .toLowerCase()
          .split(' ')
          .join('-');
        newStates[normalizedName] = !collapseBuildingPanels;
      });
      return newStates;
    });
  }, [groupedBuildings, collapseBuildingPanels, collapseBuildingPanelsTrigger]);

  return (
    <div className={classes.root}>
      {groupedBuildings.map((group, index) => {
        const normalizedName = group.name
          .toLowerCase()
          .split(' ')
          .join('-');
        const image = `/images/building-categories/${normalizedName}.png`;

        return (
          <ExpansionPanel
            key={index}
            expanded={
              expansionPanelStates[normalizedName] === undefined ||
              expansionPanelStates[normalizedName] === null
                ? true
                : expansionPanelStates[normalizedName]
            }
            className={classes.expansionPanel}
            onChange={handleChange(normalizedName)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.buildingName}>
                <div
                  className={classes.image}
                  style={{ backgroundImage: `url(${image})` }}
                />
                <Typography>{group.name}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                {group.buildings
                  .sort((a, b) => (a.name < b.name ? -1 : 1))
                  .map((building, buildingIndex) => {
                    return (
                      <Grid
                        item
                        key={buildingIndex}
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
  expansionPanel: {
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
