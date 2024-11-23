import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import { IRecordDetailsProps } from '../ui/IOGridCard';
import { FC, memo } from 'react';

export const CritterDetails: FC<IRecordDetailsProps> = memo(({ critter }) => {
  return (
    <DetailsBase title={critter.name} imgUrl={critter.imgUrl}>
      <DetailsSection title="Inputs">
        <ResourceChips ios={critter.inputs} />
      </DetailsSection>
    </DetailsBase>
  );
});

export default CritterDetails;
