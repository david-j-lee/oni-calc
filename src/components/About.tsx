import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

export const About: FC = () => {
  return (
    <div css={rootCss}>
      <div css={contentCss}>
        <Typography variant="h5">
          About O<span css={oniColorCss}>N</span>I{' '}
          <span css={onicColorCss}>C</span>alculator
        </Typography>
        <div css={sectionCss}>
          <Typography>
            ONIC is open source. Contributions are welcome!
          </Typography>
          <Button
            variant="outlined"
            target="_blank"
            href="https://github.com/david-j-lee/oni-calc"
          >
            GitHub
          </Button>
        </div>
        <div css={sectionCss}>
          <Typography>If you want to buy me some coffee.</Typography>
          <Button
            variant="outlined"
            target="_blank"
            href="https://paypal.me/davethedev"
          >
            PayPal
          </Button>
        </div>
      </div>
      <div>ONIC</div>
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
    paddingTop: theme.spacing(10),
    maxWidth: 750,
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  });

const sectionCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  });

const contentCss = css({
  flexGrow: 1,
});

const oniColorCss = css({
  color: '#FD6B6B',
});

const onicColorCss = css({
  color: '#00E3E3',
});

export default About;
