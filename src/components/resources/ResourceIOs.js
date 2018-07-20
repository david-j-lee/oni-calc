import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// components
import ResourceIOsDupes from './ResourceIOsDupes';
import ResourceIOsBuildings from './ResourceIOsBuildings';
import ResourceIOsFood from './ResourceIOsFood';
import ResourceIOsPlants from './ResourceIOsPlants';
import ResourceIOsGeysers from './ResourceIOsGeysers';

const styles = theme => ({
  section: {
    // paddingBottom: theme.spacing.unit,
  },
  noIOs: {
    padding: theme.spacing.unit,
  },
});

export class ResourceIOs extends React.Component {
  showTables = (resource, type) => {
    switch (type) {
      case 'inputs':
        return this.hasInputs(resource);
      case 'outputs':
        return this.hasOutputs(resource);
      case 'both':
        return this.hasInputs(resource) || this.hasOutputs(resource);
      default:
        return false;
    }
  };

  hasInputs = resource => {
    return (
      resource.buildingInputs.length > 0 ||
      resource.dupeInputs.length > 0 ||
      resource.foodInputs.length > 0 ||
      resource.geyserInputs.length > 0 ||
      resource.plantInputs.length > 0
    );
  };

  hasOutputs = resource => {
    return (
      resource.buildingOutputs.length > 0 ||
      resource.dupeOutputs.length > 0 ||
      resource.foodOutputs.length > 0 ||
      resource.geyserOutputs.length > 0 ||
      resource.plantOutputs.length > 0
    );
  };

  render() {
    const { classes, title, resource, type } = this.props;

    return (
      <div>
        {this.showTables(resource, type) ? (
          <div>
            <div className={classes.section}>
              <ResourceIOsDupes resource={resource} type={type} />
            </div>
            <div className={classes.section}>
              <ResourceIOsBuildings resource={resource} type={type} />
            </div>
            <div className={classes.section}>
              <ResourceIOsFood resource={resource} type={type} />
            </div>
            <div className={classes.section}>
              <ResourceIOsPlants resource={resource} type={type} />
            </div>
            <div className={classes.section}>
              <ResourceIOsGeysers resource={resource} type={type} />
            </div>
          </div>
        ) : (
          <Typography className={classes.noIOs}>No {title}</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ResourceIOs);
