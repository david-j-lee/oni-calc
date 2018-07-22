import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import BuildingsGridCard from './BuildingsGridCard';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  expansionPanel: {
    width: '100%',
  },
  building: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
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
    marginRight: theme.spacing.unit,
  },
});

export class BuildingsGrid extends React.Component {
  state = {
    expansionPanelStates: {},
  };

  componentWillMount() {
    this.setExpansionPanelStates(!this.props.collapseBuildingPanels);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.collapseBuildingPanelsTrigger !==
      this.props.collapseBuildingPanelsTrigger
    ) {
      this.setExpansionPanelStates(!nextProps.collapseBuildingPanels);
    }
  }

  setExpansionPanelStates = state => {
    let states = { ...this.state.expansionPanelStates };

    this.getGroupedBuildings().forEach(group => {
      const normalizedName = group.name
        .toLowerCase()
        .split(' ')
        .join('-');
      states = {
        ...states,
        [normalizedName]: state,
      };
    });
    this.setState({
      expansionPanelStates: states,
    });
  };

  getGroupedBuildings = () => {
    const groupedValues = this.props.buildings.reduce((a, b) => {
      a[b.category] = a[b.category] || [];
      a[b.category].push(b);
      return a;
    }, []);
    return Object.keys(groupedValues).map(group => {
      return { name: group, buildings: groupedValues[group] };
    });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expansionPanelStates: {
        ...this.state.expansionPanelStates,
        [panel]: !this.state.expansionPanelStates[panel],
      },
    });
  };

  render() {
    const { classes, collapseBuildingPanels } = this.props;
    const { expansionPanelStates } = this.state;

    return (
      <div className={classes.root}>
        {this.getGroupedBuildings().map((group, index) => {
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
              onChange={this.handleChange(normalizedName)}
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
                    .map((building, index) => {
                      return (
                        <Grid
                          item
                          key={index}
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
}

const mapStateToProps = state => {
  return {
    buildings: state.calculator.buildings,
    collapseBuildingPanels: state.calculator.collapseBuildingPanels,
    collapseBuildingPanelsTrigger:
      state.calculator.collapseBuildingPanelsTrigger,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(BuildingsGrid));
