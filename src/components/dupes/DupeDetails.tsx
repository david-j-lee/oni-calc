import IDupes from '../../interfaces/IDupes';
import IIO from '../../interfaces/IIO';
import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import { FC, memo } from 'react';

interface IProps {
  details: IDupes;
}

export const DupeDetails: FC<IProps> = memo(({ details }) => {
  return (
    <DetailsBase
      title="Dupe Details"
      wikiUrl={`${WIKI_LINK_PATH}Duplicant`}
      showWiki
    >
      <DetailsSection title="Inputs">
        <ResourceChips ios={details.inputs as IIO[]} />
      </DetailsSection>
      <DetailsSection title="Outputs">
        <ResourceChips ios={details.outputs as IIO[]} />
      </DetailsSection>
    </DetailsBase>
  );
});

export default DupeDetails;
