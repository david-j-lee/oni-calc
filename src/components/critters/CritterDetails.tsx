import { ResourceVariantEntityDetails } from '../resources/ResourceVariantEntityDetails';
import DetailsBase from '../ui/DetailsBase';
import { IEntityDetailsProps } from '../ui/IOGridCard';
import { FC, memo } from 'react';

export const CritterDetails: FC<IEntityDetailsProps> = memo(
  ({ entity, showAllVariants }: IEntityDetailsProps) => {
    return (
      <DetailsBase title={entity.name} imgUrl={entity.imgUrl}>
        <ResourceVariantEntityDetails
          entity={entity}
          showAllVariants={showAllVariants}
        />
      </DetailsBase>
    );
  },
);

export default CritterDetails;
