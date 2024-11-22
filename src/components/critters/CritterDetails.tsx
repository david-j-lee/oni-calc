import IIOEntity from '../../interfaces/IIOEntity';
import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import { FC, memo, useMemo } from 'react';

interface IProps {
  critter: IIOEntity;
}

export const CritterDetails: FC<IProps> = memo(({ critter }) => {
  const imgUrl = useMemo(
    () =>
      `/images/critter/${critter.name.toLowerCase().split(' ').join('-')}.png`,
    [critter.name],
  );

  return (
    <DetailsBase title={critter.name} imgUrl={imgUrl}>
      <DetailsSection title="Inputs">
        <ResourceChips ios={critter.inputs} />
      </DetailsSection>
    </DetailsBase>
  );
});

export default CritterDetails;
