import { ResourceVariantEntityDetails } from '../resources/ResourceVariantEntityDetails';
import DetailsBase from '../ui/DetailsBase';
import { IEntityDetailsProps } from '../ui/IOGridCard';
import { FC, memo } from 'react';

export const CritterDetails: FC<IEntityDetailsProps> = memo(
  ({
    entity,
    showAllVariants,
    setQuantity,
    setUtilization,
    setVariantUtilization,
  }: IEntityDetailsProps) => {
    return (
      <DetailsBase title={entity.name} imgUrl={entity.imgUrl}>
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

export default CritterDetails;
