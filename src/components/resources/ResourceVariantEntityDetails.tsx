import DetailsSection from '../ui/DetailsSection';
import { IEntityDetailsProps } from '../ui/IOGridCard';
import ResourceChips from './ResourceChips';
import { ArrowRightAlt } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { Fragment } from 'react';

export const ResourceVariantEntityDetails = ({
  entity,
  showAllVariants,
}: IEntityDetailsProps) => {
  if (!entity.variants || entity.variants.length == 0) {
    return null;
  }
  return (
    <Grid container>
      {showAllVariants ? (
        <Fragment>
          <Grid item xs={12} sm={6}>
            <DetailsSection>
              <Typography>Variants</Typography>
            </DetailsSection>
            {entity.variants.map((variant, index) => (
              <div key={index}>
                <DetailsSection title={`Variant ${index + 1}`}>
                  {variant.inputs && variant.inputs.length > 0 && (
                    <ResourceChips ios={variant.inputs} />
                  )}
                  <ArrowRightAlt />
                  {variant.outputs && variant.outputs.length > 0 && (
                    <ResourceChips ios={variant.outputs} />
                  )}
                </DetailsSection>
              </div>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailsSection>
              <Typography>Calculated</Typography>
            </DetailsSection>
            {entity.quantity > 0 &&
              entity.inputs &&
              entity.inputs.length > 0 && (
                <DetailsSection title="Inputs">
                  <ResourceChips ios={entity.inputs} />
                </DetailsSection>
              )}
            {entity.quantity > 0 &&
              entity.outputs &&
              entity.outputs.length > 0 && (
                <DetailsSection title="Outputs">
                  <ResourceChips ios={entity.outputs} />
                </DetailsSection>
              )}
          </Grid>
        </Fragment>
      ) : (
        <Grid item xs={12} sm={12}>
          {entity.variants[0] && (
            <Fragment>
              {entity.variants[0].inputs &&
                entity.variants[0].inputs.length > 0 && (
                  <DetailsSection title="Inputs">
                    <ResourceChips ios={entity.variants[0].inputs} />
                  </DetailsSection>
                )}
              {entity.variants[0].outputs &&
                entity.variants[0].outputs.length > 0 && (
                  <DetailsSection title="Outputs">
                    <ResourceChips ios={entity.variants[0].outputs} />
                  </DetailsSection>
                )}
            </Fragment>
          )}
          {entity.variants.length > 1 && (
            <DetailsSection>
              <Typography>
                +{entity.variants.length - 1} variant
                {entity.variants.length > 2 ? 's' : ''}
              </Typography>
            </DetailsSection>
          )}
        </Grid>
      )}
    </Grid>
  );
};
