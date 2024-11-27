import { Card, Theme, Typography, css } from '@mui/material';

type Props = {
  title?: string;
  children: React.ReactNode;
  noMargins?: boolean;
  center?: boolean;
};

export const DetailsSection = ({
  title,
  children,
  noMargins,
  center,
}: Props) => {
  return (
    <Card
      variant="outlined"
      css={[cardCss, noMargins ? undefined : cardMarginsCss]}
    >
      <div css={cardContentCss}>
        {title && (
          <Typography variant="body2" css={titleCss}>
            {title}
          </Typography>
        )}
        <div css={[detailCss, center ? centeredCss : null]}>{children}</div>
      </div>
    </Card>
  );
};

const cardCss = css({
  flexGrow: 1,
});

const cardContentCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  });

const cardMarginsCss = (theme: Theme) =>
  css({
    margin: theme.spacing(0, 1),
    marginBottom: theme.spacing(),
  });

const detailCss = css({
  fontSize: '1.2rem',
  '*': {
    fontSize: '1.2rem',
  },
});

const centeredCss = css({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const titleCss = (theme: Theme) =>
  css({
    opacity: 0.5,
    textTransform: 'uppercase',
    paddingBottom: theme.spacing(),
  });

export default DetailsSection;
