import IDupeTrait from '../../interfaces/IDupeTrait';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import ResourceDetailSection from '../ui/ResourceDetailSection';
import ResourceDetailsBase from '../ui/ResourceDetailsBase';
import { FC, memo } from 'react';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTraitDetails: FC<IProps> = memo(({ trait }) => {
  return (
    <ResourceDetailsBase
      title={trait.name}
      wikiUrl={`${WIKI_LINK_PATH}Duplicant#Traits`}
      showWiki
    >
      {Boolean(trait.inputs.length) && (
        <ResourceDetailSection title="Inputs">
          <ResourceChips ios={trait.inputs} />
        </ResourceDetailSection>
      )}
      {Boolean(trait.outputs.length) && (
        <ResourceDetailSection title="Outputs">
          <ResourceChips ios={trait.outputs} />
        </ResourceDetailSection>
      )}
    </ResourceDetailsBase>
  );
});

export default DupeTraitDetails;
