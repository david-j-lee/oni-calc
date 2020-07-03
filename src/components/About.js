import React from 'react';

// material
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

export const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5">
          About O<span className={classes.oniColor}>N</span>I{' '}
          <span className={classes.onicColor}>C</span>
          alculator
        </Typography>
        <div>
          <h1>Contributors</h1>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://devdavidlee.com"
                className={classes.link}
                rel="noopener noreferrer"
              >
                David Lee
              </a>
            </li>
          </ul>
          <Button
            variant="outlined"
            target="_blank"
            href="https://github.com/david-j-lee/oni-calc"
          >
            GitHub
          </Button>
        </div>
        <div>
          <h1>Supporters</h1>
          <p>Special thanks to those who have donated!</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
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

const useStyles = makeStyles((theme) => ({
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
