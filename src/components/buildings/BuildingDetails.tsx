import IBuilding from '../../interfaces/IBuilding';
import { ResourceVariantEntityDetails } from '../resources/ResourceVariantEntityDetails';
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
  showAllVariants?: boolean;
  setQuantity: (name: string, value: number) => void;
  setUtilization: (name: string, value: number) => void;
  setVariantUtilization: (name: string, values: number[]) => void;
}

export const BuildingDetails: FC<IProps> = memo(
  ({
    building,
    showWiki,
    showAllVariants,
    setQuantity,
    setUtilization,
    setVariantUtilization,
  }) => {
    const { category, categoryImgUrl, name, imgUrl, power, capacity } =
      building;

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
        <ResourceVariantEntityDetails
          entity={building}
          showAllVariants={showAllVariants}
          setQuantity={setQuantity}
          setUtilization={setUtilization}
          setVariantUtilization={setVariantUtilization}
        />
      </DetailsBase>
    );
  },
);

const categoryImageCss = (theme: Theme) =>
  css({
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
  });

export default BuildingDetails;
