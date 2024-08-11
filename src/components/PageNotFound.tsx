import { Alert, Button, Theme, css } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div css={rootCss}>
      <Alert severity="warning" variant="outlined" css={alertCss}>
        Page Not Found!
      </Alert>
      <Button component={Link} to="/">
        Back To Home
      </Button>
    </div>
  );
};

const rootCss = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const alertCss = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(4),
  });

export default PageNotFound;
