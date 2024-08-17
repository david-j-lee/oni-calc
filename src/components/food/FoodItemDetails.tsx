import { WIKI_LINK_PATH } from '../../utils/parseUtils';
import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
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
    <DetailsBase
      imgUrl={imgUrl}
      title={item.name}
      wikiUrl={wikiUrl}
      showWiki={showWiki ?? false}
    >
      <DetailsSection title="Calories">{item.calories}</DetailsSection>
      <DetailsSection title="Quality">{item.quality}</DetailsSection>
      {item.requirements.length > 0 && (
        <DetailsSection title="Requirements">
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
        </DetailsSection>
      )}
      {item.inputs.length > 0 && (
        <DetailsSection title="Inputs">
          <ResourceChips ios={item.inputs} />
        </DetailsSection>
      )}
    </DetailsBase>
  );
});

const avatarCss = css({
  height: '100%',
  width: '100%',
  backgroundSize: 'contain',
});

export default FoodItemDetail;
