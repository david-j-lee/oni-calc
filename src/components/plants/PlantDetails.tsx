import { FC, memo, useRef } from 'react';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import IPlant from './../../interfaces/IPlant';

// components
import ResourceChips from '../resources/ResourceChips';

interface IProps {
  plant: IPlant;
}

export const PlantDetails: FC<IProps> = memo(({ plant }) => {
  const imgUrl = useRef(
    `/images/bio/${plant.name.toLowerCase().split(' ').join('-')}.png`,
  );

  return (
    <div>
      <div css={headingCss}>
        <div
          css={imageCss}
          style={{
            background: `#3E4357 url(${imgUrl.current}) no-repeat center center`,
            backgroundSize: 'contain',
          }}
        />
        <div css={headingContentCss}>
          <Typography variant="h6">{plant.name}</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" css={titleCss}>
                <small>Growth Rate</small>
                <br />
                {plant.growthRate.value} {plant.growthRate.rate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" css={titleCss}>
                <small>Yield</small>
                <br />
                {plant.yield}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div css={contentCss}>
        <Typography variant="subtitle1" css={titleCss}>
          Inputs
        </Typography>
        <ResourceChips ios={plant.inputs} />
      </div>
    </div>
  );
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

const imageCss = css({
  width: 120,
  height: 120,
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

export default PlantDetails;
