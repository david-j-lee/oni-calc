import React, { FC, memo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IResource from './../../interfaces/IResource';

// components
import ResourceIOsDupes from './ResourceIOsDupes';
import ResourceIOsBuildings from './ResourceIOsBuildings';
import ResourceIOsFood from './ResourceIOsFood';
import ResourceIOsPlants from './ResourceIOsPlants';
import ResourceIOsGeysers from './ResourceIOsGeysers';

interface IProps {
  title: string;
  resource: IResource;
  type: string;
}

export const ResourceIOs: FC<IProps> = memo(({ title, resource, type }) => {
  const classes = useStyles();

  const showTables = (resource, type) => {
    switch (type) {
      case 'inputs':
        return hasInputs(resource);
      case 'outputs':
        return hasOutputs(resource);
      case 'both':
        return hasInputs(resource) || hasOutputs(resource);
      default:
        return false;
    }
  };

  const hasInputs = (resource) => {
    return (
      resource.buildingInputs.length > 0 ||
      resource.dupeInputs.length > 0 ||
      resource.foodInputs.length > 0 ||
      resource.geyserInputs.length > 0 ||
      resource.plantInputs.length > 0
    );
  };

  const hasOutputs = (resource) => {
    return (
      resource.buildingOutputs.length > 0 ||
      resource.dupeOutputs.length > 0 ||
      resource.foodOutputs.length > 0 ||
      resource.geyserOutputs.length > 0 ||
      resource.plantOutputs.length > 0
    );
  };

  return (
    <div>
      {showTables(resource, type) ? (
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
});

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    // paddingBottom: theme.spacing(),
  },
  noIOs: {
    padding: theme.spacing(),
  },
}));

export default ResourceIOs;
