import React from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
  },
  avatar: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
  },
});

export class ResourceChips extends React.Component {
  render() {
    const { classes, ios } = this.props;
    let mappedIOs = ios
      .sort((a, b) => {
        return a.name > b.name;
      })
      .map((io, index) => {
        const rate = io.rate === 'per second' ? '/s' : io.rate;
        const imageUrl = '/images/resources/' + io.name.toLowerCase().split(' ').join('-') + '.png';
        return (
          <Chip
            key={index}
            className={classes.chip}
            avatar={
              <Avatar>
                <div
                  className={classes.avatar}
                  style={{ backgroundImage: `url(${imageUrl})` }} />
              </Avatar>
            }
            label={[io.name, io.value, io.unit + rate].join(' ')}
          />
        )
      })
    if (mappedIOs.length === 0) {
      mappedIOs = (
        <Typography>
          No resources found
        </Typography>
      );
    }
    return (
      <div>
        {mappedIOs}
      </div>
    )
  }
}

export default withStyles(styles)(ResourceChips);