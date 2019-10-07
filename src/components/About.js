import React from 'react';

// material
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

export default function About() {
  const classes = useStyles();
  const gitHubLink = (
    <a
      target="_blank"
      href="https://github.com/david-j-lee/oni-calc"
      className={classes.link}
      rel="noopener noreferrer"
    >
      GitHub
    </a>
  );
  const payPalLink = (
    <a
      target="_blank"
      href="https://paypal.me/davethedev"
      className={classes.link}
      rel="noopener noreferrer"
    >
      PayPal
    </a>
  );

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="headline">
          About O<span className={classes.oniColor}>N</span>I{' '}
          <span className={classes.onicColor}>C</span>
          alculator
        </Typography>
        <div className={classes.actions}>
          <Button
            variant="outlined"
            target="_blank"
            href="https://github.com/david-j-lee/oni-calc"
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            target="_blank"
            href="https://paypal.me/davethedev"
          >
            PayPal
          </Button>
        </div>
        <Typography variant="body1" className={classes.section}>
          Sick of having to start a new game because you used up all your water?
          Tired of your dupes throwing up your hard earned stuffed berries? Well
          you have come to the right place. Victory favors the prepared. So
          prepare yourself for the tool that will allow you to reach more cycles
          than the Tour De France.
        </Typography>
        <Typography variant="body1" className={classes.section}>
          This application is currently in early access. You can contribute to
          this project through the {gitHubLink} page. Please report any issues
          or bugs on the GitHub page.
        </Typography>
        <Typography variant="body1" className={classes.section}>
          This application will always be free. If you are enjoying the
          application you can show your appreciation by donating to my{' '}
          {payPalLink}. This money will be used for hosting fees and coffee.
        </Typography>
      </div>
      <div>
        <h1>Supporters</h1>
        <p>
          These people have showed support in the application, thank you! You
          make working on this project extra special.
        </p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className={classes.footer}>
        <Typography variant="caption">
          by{' '}
          <a
            target="_blank"
            href="https://devdavidlee.com"
            className={classes.link}
            rel="noopener noreferrer"
          >
            David Lee
          </a>
        </Typography>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
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
