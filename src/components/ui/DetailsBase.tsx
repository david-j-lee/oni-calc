import { css } from '@emotion/react';
import { Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { useMemo } from 'react';

type Props = {
  imgUrl?: string;
  preTitle?: React.ReactNode;
  title: string;
  wikiUrl?: string;
  showWiki?: boolean;
  children: React.ReactNode;
};

export const DetailsBase = ({
  imgUrl,
  preTitle,
  title,
  wikiUrl,
  showWiki,
  children,
}: Props) => {
  const backgroundImgCss = useMemo(
    () =>
      css({
        background: `url(${imgUrl}) no-repeat center center`,
        backgroundSize: 'contain',
      }),
    [imgUrl],
  );

  return (
    <div css={rootCss}>
      <Grid container>
        {Boolean(imgUrl) && (
          <Grid item md={3}>
            <div css={imageWrapperCss}>
              <div css={[imageCss, backgroundImgCss]} />
            </div>
          </Grid>
        )}
        <Grid item md={imgUrl ? 9 : 12}>
          <Stack>
            <div css={headingCss}>
              {Boolean(preTitle) && <div css={preTitleCss}>{preTitle}</div>}
              <Typography
                variant="h4"
                id="responsive-dialog-title"
                css={titleCss}
              >
                {title}
              </Typography>
              {wikiUrl && showWiki && (
                <Button variant="outlined" target="_blank" href={wikiUrl}>
                  WIKI
                </Button>
              )}
            </div>
            {children}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

const rootCss = css({
  minWidth: 400,
  maxWidth: 600,
});

const imageWrapperCss = (theme: Theme) =>
  css({
    padding: theme.spacing(2),
    backgroundColor: '#3E4357',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

const imageCss = css({
  width: 160,
  height: 160,
});

const headingCss = (theme: Theme) =>
  css({
    padding: theme.spacing(2),
  });

const preTitleCss = css({
  display: 'flex',
  alignItems: 'center',
});

const titleCss = (theme: Theme) =>
  css({
    paddingBottom: theme.spacing(),
  });

export default DetailsBase;
