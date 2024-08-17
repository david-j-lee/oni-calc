import IDupes from '../../interfaces/IDupes';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import ResourceDetailSection from '../ui/ResourceDetailSection';
import ResourceDetailsBase from '../ui/ResourceDetailsBase';
import { FC, memo } from 'react';

interface IProps {
  details: IDupes;
}

export const DupeDetails: FC<IProps> = memo(({ details }) => {
  return (
    <ResourceDetailsBase
      title="Dupe Details"
      wikiUrl={`${WIKI_LINK_PATH}Duplicant`}
      showWiki
    >
      <ResourceDetailSection title="Inputs">
        <ResourceChips ios={details.inputs} />
      </ResourceDetailSection>
      <ResourceDetailSection title="Outputs">
        <ResourceChips ios={details.outputs} />
      </ResourceDetailSection>
    </ResourceDetailsBase>
  );
});

export default DupeDetails;
