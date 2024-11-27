import IPlant from '../../interfaces/IPlant';
import { ResourceVariantEntityDetails } from '../resources/ResourceVariantEntityDetails';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import { IEntityDetailsProps } from '../ui/IOGridCard';
import { Grid } from '@mui/material';
import { FC, memo } from 'react';

export const PlantDetails: FC<IEntityDetailsProps> = memo(
  ({
    entity,
    showAllVariants,
    setQuantity,
    setUtilization,
    setVariantUtilization,
  }: IEntityDetailsProps) => {
    const plant = entity as IPlant;
    return (
      <DetailsBase title={plant.name} imgUrl={plant.imgUrl}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <DetailsSection title="Growth Rate">
              {plant.growthRate.value} {plant.growthRate.rate}
            </DetailsSection>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailsSection title="Yield">{plant.yield}</DetailsSection>
          </Grid>
        </Grid>
        <ResourceVariantEntityDetails
          entity={entity}
          showAllVariants={showAllVariants}
          setQuantity={setQuantity}
          setUtilization={setUtilization}
          setVariantUtilization={setVariantUtilization}
        />
      </DetailsBase>
    );
  },
);

PlantDetails.displayName = 'PlantDetails';

export default PlantDetails;
