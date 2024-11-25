import IDupeTrait from '../../interfaces/IDupeTrait';
import IIO from '../../interfaces/IIO';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import { FC, memo } from 'react';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTraitDetails: FC<IProps> = memo(({ trait }) => {
  return (
    <DetailsBase
      title={trait.name}
      wikiUrl={`${WIKI_LINK_PATH}Duplicant#Traits`}
      showWiki
    >
      {Boolean(trait.inputs.length) && (
        <DetailsSection title="Inputs">
          <ResourceChips ios={trait.inputs as IIO[]} />
        </DetailsSection>
      )}
      {Boolean(trait.outputs.length) && (
        <DetailsSection title="Outputs">
          <ResourceChips ios={trait.outputs as IIO[]} />
        </DetailsSection>
      )}
    </DetailsBase>
  );
});

export default DupeTraitDetails;
