import React from 'react';

import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  topMessage: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    minHeight: 10,
    justifyContent: 'space-between',
    '& a': {
      color: 'inherit',
    },
  },
  iconButton: {
    height: 25,
    width: 25,
  },
});

export class TopMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  handleClick() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { classes, tabIndex } = this.props;

    if (!this.state.show) {
      return null;
    }

    return (
      <Toolbar
        color="secondary"
        variant="caption"
        className={classes.topMessage}
      >
        <Typography>
          A new version is in progress, please be patient! You can follow the
          progress at{' '}
          <a href="https://github.com/david-j-lee/oni-calc">
            github.com/david-j-lee/oni-calc
          </a>
          .
        </Typography>
        <IconButton
          onClick={() => this.handleClick()}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(TopMessage);
