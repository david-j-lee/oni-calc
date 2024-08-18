import IBuilding from '../../interfaces/IBuilding';
import ResourceChips from '../resources/ResourceChips';
import DetailsBase from '../ui/DetailsBase';
import DetailsSection from '../ui/DetailsSection';
import Number from '../ui/Number';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, Fragment, memo, useEffect, useMemo, useState } from 'react';

interface IProps {
  building: IBuilding;
  showWiki?: boolean;
}

export const BuildingDetails: FC<IProps> = memo(({ building, showWiki }) => {
  const {
    category,
    categoryImgUrl,
    name,
    imgUrl,
    power,
    capacity,
    inputs,
    outputs,
  } = building;

  const [netPower, setNetPower] = useState(0);
  const [powerSuffix, setPowerSuffix] = useState<string | null>(null);

  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${categoryImgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [categoryImgUrl],
  );

  useEffect(() => {
    setNetPower((power.generation || 0) - (power.usage || 0));
    setPowerSuffix(
      `${power.unit || ''} (+${power.generation || 0}/-${power.usage || 0})`,
    );
  }, [power.generation, power.unit, power.usage]);

  return (
    <DetailsBase
      imgUrl={imgUrl}
      preTitle={
        <Fragment>
          <div css={[categoryImageCss, backgroundImgCss]} />
          <Typography>{category}</Typography>
        </Fragment>
      }
      title={name}
      wikiUrl={building.wikiUrl}
      showWiki={showWiki ?? false}
    >
      {Boolean(netPower) && (
        <DetailsSection title="Power">
          <Number value={netPower} suffix={powerSuffix} />
        </DetailsSection>
      )}
      {Boolean(capacity.power.value) && (
        <DetailsSection title="Power Capacity">
          {capacity.power.value + ' ' + capacity.power.unit}
        </DetailsSection>
      )}
      {Boolean(capacity.resources.value) && (
        <DetailsSection title="Resource Capacity">
          {capacity.resources.value.toLocaleString() +
            ' ' +
            capacity.resources.unit}
        </DetailsSection>
      )}
      {Boolean(inputs.length) && (
        <DetailsSection title="Inputs">
          <ResourceChips ios={inputs} />
        </DetailsSection>
      )}
      {Boolean(outputs.length) && (
        <DetailsSection title="Outputs">
          <ResourceChips ios={outputs} />
        </DetailsSection>
      )}
    </DetailsBase>
  );
});

const categoryImageCss = (theme: Theme) =>
  css({
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
  });

export default BuildingDetails;
