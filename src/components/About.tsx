import React, { FC } from 'react';

// material
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const About: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5">
          About O<span className={classes.oniColor}>N</span>I{' '}
          <span className={classes.onicColor}>C</span>alculator
        </Typography>
        <div className={classes.section}>
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
        <div className={classes.section}>
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
      <div className={classes.footer}>ONIC</div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(10),
    maxWidth: 750,
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    paddingTop: theme.spacing(2),
  },
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
  },
  footer: {},
  oniColor: {
    color: '#FD6B6B',
  },
  onicColor: {
    color: '#00E3E3',
  },
  link: {
    color: theme.palette.text.primary,
  },
}));

export default About;
