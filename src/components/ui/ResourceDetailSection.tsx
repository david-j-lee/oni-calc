import { Card, CardContent, Theme, Typography, css } from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ResourceDetailSection = ({ title, children }: Props) => {
  return (
    <Card variant="outlined" css={cardCss}>
      <CardContent css={cardContentCss}>
        <Typography variant="body2" css={titleCss}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

const cardCss = (theme: Theme) =>
  css({
    margin: theme.spacing(0, 2),
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  });

const cardContentCss = (theme: Theme) =>
  css({
    padding: theme.spacing(1),
    paddingBottom: `${theme.spacing()} !important`,
  });

const titleCss = (theme: Theme) =>
  css({
    opacity: 0.5,
    textTransform: 'uppercase',
    paddingBottom: theme.spacing(),
  });

export default ResourceDetailSection;
