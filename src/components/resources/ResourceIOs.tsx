import { FC, Fragment, memo } from 'react';

import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
  const showTables = (resource: IResource, type: string) => {
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

  const hasInputs = (resource: IResource) => {
    return (
      resource.buildingInputs.length > 0 ||
      resource.dupeInputs.length > 0 ||
      resource.foodInputs.length > 0 ||
      resource.geyserInputs.length > 0 ||
      resource.plantInputs.length > 0
    );
  };

  const hasOutputs = (resource: IResource) => {
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
        <Fragment>
          <ResourceIOsDupes resource={resource} type={type} />
          <ResourceIOsBuildings resource={resource} type={type} />
          <ResourceIOsFood resource={resource} type={type} />
          <ResourceIOsPlants resource={resource} type={type} />
          <ResourceIOsGeysers resource={resource} type={type} />
        </Fragment>
      ) : (
        <Typography css={noIOsCss}>No {title}</Typography>
      )}
    </div>
  );
});

const noIOsCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default ResourceIOs;
