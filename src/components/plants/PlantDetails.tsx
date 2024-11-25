import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import IPlant from './../../interfaces/IPlant';
import { FC, memo } from 'react';

interface IProps {
  plant: IPlant;
}

export const PlantDetails: FC<IProps> = memo(({ plant }) => {
  return (
    <DetailsBase title={plant.name} imgUrl={plant.imgUrl}>
      <DetailsSection title="Growth Rate">
        {plant.growthRate.value} {plant.growthRate.rate}
      </DetailsSection>
      <DetailsSection title="Yield">{plant.yield}</DetailsSection>
      <DetailsSection title="Inputs">
        <ResourceChips ios={plant.inputs} />
      </DetailsSection>
    </DetailsBase>
  );
});

export default PlantDetails;
