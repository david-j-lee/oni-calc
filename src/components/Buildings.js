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
import Building from './Building';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  expansionPanel: {
    width: '100%',
  },
  building: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    [theme.breakpoints.down("sm")]: {
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

export class Buildings extends React.Component {
  render() {
    const { classes } = this.props;

    const groupedToValues = this.props.buildings.reduce((a, b) => {
      a[b.category] = a[b.category] || [];
      a[b.category].push(b);
      return a;
    }, []);

    const groupedBuildings = Object.keys(groupedToValues).map(group => {
      return { name: group, buildings: groupedToValues[group] };
    });

    const buildings = groupedBuildings.map((group, index) => {
      const image = '/images/building-categories/' +
        group.name.toLowerCase().split(' ').join('-') + '.png';
      return (
        <ExpansionPanel
          key={index}
          defaultExpanded
          className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.buildingName}>
              <div
                className={classes.image}
                style={{ backgroundImage: `url(${image})` }} />
              <Typography>
                {group.name}
              </Typography>
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
                      xl={3}>
                      <Building building={building} />
                    </Grid>
                  )
                })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    });

    return (
      <div className={classes.root}>
        {buildings}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildings: state.calculator.buildings
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Buildings))