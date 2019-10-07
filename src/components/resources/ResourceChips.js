import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function ResourceChips({ ios }) {
  const classes = useStyles();
  let mappedIOs = ios
    .sort((a, b) => {
      return a.name > b.name;
    })
    .map((io, index) => {
      let rate = io.rate;
      if (io.unit) {
        rate = io.rate.replace('per ', '/').replace('second', 's');
      }

      const imageUrl = `/images/resources/${io.name
        .toLowerCase()
        .split(' ')
        .join('-')}.png`;

      return (
        <Chip
          key={index}
          className={classes.chip}
          avatar={
            <Avatar>
              <div
                className={classes.avatar}
                style={{
                  background: `url(${imageUrl}) no-repeat center center`,
                  backgroundSize: 'contain',
                }}
              />
            </Avatar>
          }
          label={[io.name, io.value, (io.unit || '') + rate].join(' ')}
        />
      );
    });
  if (mappedIOs.length === 0) {
    mappedIOs = <Typography>No resources found</Typography>;
  }
  return <div>{mappedIOs}</div>;
}

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(),
  },
  avatar: {
    height: '75%',
    width: '75%',
  },
}));
