import IBuilding from '../../interfaces/IBuilding';
import ResourceChips from '../resources/ResourceChips';
import Number from '../ui/Number';
import ResourceDetailSection from '../ui/ResourceDetailSection';
import ResourceDetailsBase from '../ui/ResourceDetailsBase';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, Fragment, memo, useEffect, useState } from 'react';

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

  useEffect(() => {
    setNetPower((power.generation || 0) - (power.usage || 0));
    setPowerSuffix(
      `${power.unit || ''} (+${power.generation || 0}/-${power.usage || 0})`,
    );
  }, [power.generation, power.unit, power.usage]);

  return (
    <ResourceDetailsBase
      imgUrl={imgUrl}
      preTitle={
        <Fragment>
          <div
            css={categoryImageCss}
            style={{
              background: `url(${categoryImgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          <Typography>{category}</Typography>
        </Fragment>
      }
      title={name}
      wikiUrl={building.wikiUrl}
      showWiki={showWiki ?? false}
    >
      {Boolean(netPower) && (
        <ResourceDetailSection title="Power">
          <Number value={netPower} suffix={powerSuffix} />
        </ResourceDetailSection>
      )}
      {Boolean(capacity.power.value) && (
        <ResourceDetailSection title="Power Capacity">
          {capacity.power.value + ' ' + capacity.power.unit}
        </ResourceDetailSection>
      )}
      {Boolean(capacity.resources.value) && (
        <ResourceDetailSection title="Resource Capacity">
          {capacity.resources.value.toLocaleString() +
            ' ' +
            capacity.resources.unit}
        </ResourceDetailSection>
      )}
      {Boolean(inputs.length) && (
        <ResourceDetailSection title="Inputs">
          <ResourceChips ios={inputs} />
        </ResourceDetailSection>
      )}
      {Boolean(outputs.length) && (
        <ResourceDetailSection title="Outputs">
          <ResourceChips ios={outputs} />
        </ResourceDetailSection>
      )}
    </ResourceDetailsBase>
  );
});

const categoryImageCss = (theme: Theme) =>
  css({
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
  });

export default BuildingDetails;
