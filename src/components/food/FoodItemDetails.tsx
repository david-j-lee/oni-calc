import ResourceChips from '../resources/ResourceChips';
import IFood from './../../interfaces/IFood';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, Fragment, memo, useRef } from 'react';

interface IProps {
  item: IFood;
}

export const FoodItemDetail: FC<IProps> = memo(({ item }) => {
  const imgUrl = useRef(
    `/images/resources/${item.name.toLowerCase().replaceAll(/[ ']/g, '-')}.png`,
  );

  return (
    <div css={rootCss}>
      <div css={headingCss}>
        <div
          css={imageCss}
          style={{
            background: `#3E4357 url(${imgUrl.current}) no-repeat center center`,
            backgroundSize: 'contain',
          }}
        />
        <div css={headingContentCss}>
          <Typography variant="h6">{item.name}</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" css={titleCss}>
                <small>Calories</small>
                <br />
                {item.calories}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" css={titleCss}>
                <small>Quality</small>
                <br />
                {item.quality}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div css={contentCss}>
        {item.requirements.length > 0 && (
          <Fragment>
            <Typography variant="subtitle1" css={titleCss}>
              Requirements
            </Typography>
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
          </Fragment>
        )}
        {item.inputs.length > 0 && (
          <Fragment>
            <Typography variant="subtitle1" css={titleCss}>
              Inputs
            </Typography>
            <ResourceChips ios={item.inputs} />
          </Fragment>
        )}
      </div>
    </div>
  );
});

export default FoodItemDetail;

const rootCss = css({
  minWidth: 400,
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

const avatarCss = css({
  height: '100%',
  width: '100%',
  backgroundSize: 'contain',
});
