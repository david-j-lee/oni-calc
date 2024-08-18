import { Card, CardContent, Theme, Typography, css } from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
  noMargins?: boolean;
};

export const DetailsSection = ({ title, children, noMargins }: Props) => {
  return (
    <Card
      variant="outlined"
      css={[cardCss, noMargins ? undefined : cardMarginsCss]}
    >
      <CardContent>
        <Typography variant="body2" css={titleCss}>
          {title}
        </Typography>
        <div css={detailCss}>{children}</div>
      </CardContent>
    </Card>
  );
};

const cardCss = css({
  flexGrow: 1,
});

const cardMarginsCss = (theme: Theme) =>
  css({
    margin: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
  });

const detailCss = css({
  fontSize: '1.25rem',
  '*': {
    fontSize: '1.25rem',
  },
});

const titleCss = (theme: Theme) =>
  css({
    opacity: 0.5,
    textTransform: 'uppercase',
    paddingBottom: theme.spacing(),
  });

export default DetailsSection;
