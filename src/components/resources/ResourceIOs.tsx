import IResource from './../../interfaces/IResource';
import ResourceIOsDupes from './ResourceIOsDupes';
import ResourceIOsGeysers from './ResourceIOsGeysers';
import ResourceIOsVariants from './ResourceIOsVariants';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, Fragment, memo, useMemo } from 'react';

const hasInputs = (resource: IResource) => {
  return (
    Object.values(resource.subtotals).some(
      (subtotal) => subtotal.inputs.length > 0,
    ) ||
    resource.dupeInputs.length > 0 ||
    resource.geyserInputs.length > 0
  );
};

const hasOutputs = (resource: IResource) => {
  return (
    Object.values(resource.subtotals).some(
      (subtotal) => subtotal.outputs.length > 0,
    ) ||
    resource.dupeOutputs.length > 0 ||
    resource.geyserOutputs.length > 0
  );
};

interface IProps {
  title: string;
  resource: IResource;
  type: 'inputs' | 'outputs' | 'both';
}

export const ResourceIOs: FC<IProps> = memo(({ title, resource, type }) => {
  const showTables = useMemo(() => {
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
  }, [type, resource]);

  if (resource && type && !showTables) {
    return <Typography css={noIOsCss}>No {title}</Typography>;
  }

  return (
    <Fragment>
      <ResourceIOsDupes resource={resource} type={type} />
      <ResourceIOsVariants entity="buildings" resource={resource} type={type} />
      <ResourceIOsVariants entity="plants" resource={resource} type={type} />
      <ResourceIOsGeysers resource={resource} type={type} />
    </Fragment>
  );
});

const noIOsCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default ResourceIOs;
