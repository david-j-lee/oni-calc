import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles } from '@material-ui/style';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import BuildingsGridCard from './BuildingsGridCard';

export default function BuildingsGrid() {
  // const mapStateToProps = state => {
  //   return {
  //     buildings: state.calculator.buildings,
  //     collapseBuildingPanels: state.calculator.collapseBuildingPanels,
  //     collapseBuildingPanelsTrigger:
  //       state.calculator.collapseBuildingPanelsTrigger,
  //   };
  // };

  const classes = useStyles();

  const [
    { buildings, collapseBuildingPanels, collapseBuildingPanelsTrigger },
  ] = useContext();

  const [groupedBuildings, setGroupedBuildings] = useState();
  const [expansionPanelStates, setExpansionPanelStates] = useState();

  useEffect(() => {
    const getGroupedBuildings = () => {
      const groupedValues = buildings.reduce((a, b) => {
        a[b.category] = a[b.category] || [];
        a[b.category].push(b);
        return a;
      }, []);
      return Object.keys(groupedValues).map(group => {
        return { name: group, buildings: groupedValues[group] };
      });
    };

    const updateExpansionPanelStates = state => {
      let states = { ...expansionPanelStates };
      const updatedGroupedBuildings = getGroupedBuildings();
      updatedGroupedBuildings().forEach(group => {
        const normalizedName = group.name
          .toLowerCase()
          .split(' ')
          .join('-');
        states = {
          ...states,
          [normalizedName]: state,
        };
      });
      setGroupedBuildings(updatedGroupedBuildings);
      setExpansionPanelStates(states);
    };
    updateExpansionPanelStates(!collapseBuildingPanels);
  }, [buildings, collapseBuildingPanels, expansionPanelStates]);

  const handleChange = panel => (event, expanded) => {
    setExpansionPanelStates({
      ...expansionPanelStates,
      [panel]: !expansionPanelStates[panel],
    });
  };

  return (
    <div className={classes.root}>
      {groupedBuildings().map((group, index) => {
        const normalizedName = group.name
          .toLowerCase()
          .split(' ')
          .join('-');

        const image = `/images/building-categories/${normalizedName}.png`;

        return (
          <ExpansionPanel
            key={index}
            expanded={expansionPanelStates[normalizedName]}
            defaultExpanded={!collapseBuildingPanels}
            className={classes.expansionPanel}
            onChange={() => handleChange(normalizedName)}
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
  },
  expansionPanel: {
    width: '100%',
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
