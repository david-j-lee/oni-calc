import { FC, Fragment, memo, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IBuilding from '../../interfaces/IBuilding';

import ResourceChips from '../resources/ResourceChips';
import Number from '../ui/Number';

interface IProps {
  building: IBuilding;
}

export const BuildingDetails: FC<IProps> = memo(({ building }) => {
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
    <div css={rootCss}>
      <div css={headingCss}>
        <div css={imageWrapperCss}>
          <div
            css={imageCss}
            style={{
              background: `url(${imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
        </div>
        <div css={headingContentCss}>
          <Typography variant="h4" id="responsive-dialog-title">
            {name}
          </Typography>
          <div css={categoryCss}>
            <div
              css={categoryImageCss}
              style={{
                background: `url(${categoryImgUrl}) no-repeat center center`,
                backgroundSize: 'contain',
              }}
            />
            <Typography css={categoryCss}>{category}</Typography>
          </div>
        </div>
      </div>

      <div css={contentCss}>
        {!netPower ? null : (
          <Fragment>
            <Typography variant="body1" css={titleCss}>
              <small>Power</small>
            </Typography>
            <Number value={netPower} suffix={powerSuffix} />
          </Fragment>
        )}
        {!capacity.power.value ? null : (
          <Typography variant="body1" css={titleCss}>
            <small>Power Capacity</small>
            <br />
            {capacity.power.value + ' ' + capacity.power.unit}
          </Typography>
        )}
        {!capacity.resources.value ? null : (
          <Typography variant="body1" css={titleCss}>
            <small>Resource Capacity</small>
            <br />
            {capacity.resources.value.toLocaleString() +
              ' ' +
              capacity.resources.unit}
          </Typography>
        )}
        {!inputs.length ? null : (
          <Fragment>
            <Typography variant="subtitle1" css={titleCss}>
              Inputs
            </Typography>
            <ResourceChips ios={inputs} />
          </Fragment>
        )}
        {!outputs.length ? null : (
          <Fragment>
            <Typography variant="subtitle1" css={titleCss}>
              Outputs
            </Typography>
            <ResourceChips ios={outputs} />
          </Fragment>
        )}
      </div>
    </div>
  );
});

const rootCss = css({
  minWidth: 400,
});

const imageWrapperCss = (theme: Theme) =>
  css({
    padding: theme.spacing(2),
    backgroundColor: '#3E4357',
  });

const imageCss = css({
  width: 160,
  height: 160,
});

const headingCss = css({
  display: 'flex',
  flexWrap: 'wrap',
});

const headingContentCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: 0,
    width: 500 - 160,
    flexGrow: 1,
  });

const categoryCss = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.75),
  });

const categoryImageCss = (theme: Theme) =>
  css({
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
  });

const titleCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  });

const contentCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  });

export default BuildingDetails;
