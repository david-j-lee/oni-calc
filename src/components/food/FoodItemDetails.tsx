import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import ResourceDetailSection from '../ui/ResourceDetailSection';
import ResourceDetailsBase from '../ui/ResourceDetailsBase';
import IFood from './../../interfaces/IFood';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { FC, memo, useMemo } from 'react';

interface IProps {
  item: IFood;
  showWiki?: boolean;
}

export const FoodItemDetail: FC<IProps> = memo(({ item, showWiki }) => {
  const imgUrl = useMemo(
    () =>
      `/images/resources/${item.name.toLowerCase().replaceAll(/[ ']/g, '-')}.png`,
    [item],
  );

  const wikiUrl = useMemo(
    () => WIKI_LINK_PATH + item.name.split(' ').join('_'),
    [item],
  );

  return (
    <ResourceDetailsBase
      imgUrl={imgUrl}
      title={item.name}
      wikiUrl={wikiUrl}
      showWiki={showWiki ?? false}
    >
      <ResourceDetailSection title="Calories">
        {item.calories}
      </ResourceDetailSection>
      <ResourceDetailSection title="Quality">
        {item.quality}
      </ResourceDetailSection>
      {item.requirements.length > 0 && (
        <ResourceDetailSection title="Requirements">
          {item.requirements.map((requirement, i) => {
            const reqImgUrl = `/images/bio/${requirement.name
              .toLowerCase()
              .split(' ')
              .join('-')}.png`;

            return (
              <Chip
                key={i}
                label={requirement.name}
                avatar={
                  <Avatar>
                    <div
                      css={avatarCss}
                      style={{ backgroundImage: `url(${reqImgUrl})` }}
                    />
                  </Avatar>
                }
              />
            );
          })}
        </ResourceDetailSection>
      )}
      {item.inputs.length > 0 && (
        <ResourceDetailSection title="Inputs">
          <ResourceChips ios={item.inputs} />
        </ResourceDetailSection>
      )}
    </ResourceDetailsBase>
  );
});

const avatarCss = css({
  height: '100%',
  width: '100%',
  backgroundSize: 'contain',
});

export default FoodItemDetail;
