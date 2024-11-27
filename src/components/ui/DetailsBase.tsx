import { css } from '@emotion/react';
import { Button, Grid } from '@mui/material';
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
      {Boolean(imgUrl) && (
        <Grid item md={3}>
          <div css={imageWrapperCss}>
            <div css={[imageCss, backgroundImgCss]} />
          </div>
        </Grid>
      )}
      <Grid item md={imgUrl ? 9 : 12} css={contentCss}>
        <div css={headingCss}>
          {Boolean(preTitle) && <div css={preTitleCss}>{preTitle}</div>}
          <Typography variant="h4">{title}</Typography>
          {wikiUrl && showWiki && (
            <Button variant="outlined" target="_blank" href={wikiUrl}>
              WIKI
            </Button>
          )}
        </div>
        <div css={childrenCss}>{children}</div>
      </Grid>
    </div>
  );
};

const rootCss = css({
  display: 'flex',
  maxHeight: '100%',
  overflowY: 'hidden',
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

const contentCss = css({
  display: 'flex',
  flexDirection: 'column',
});

const headingCss = (theme: Theme) =>
  css({
    padding: theme.spacing(2),
  });

const preTitleCss = css({
  display: 'flex',
  alignItems: 'center',
});

const childrenCss = css({
  width: '100%',
  overflowY: 'auto',
});

export default DetailsBase;
