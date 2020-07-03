import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import { getGameModeValue } from './../../utils/commonUtils';

export const ResourceChips = ({ ios }) => {
  const classes = useStyles();
  const [{ settings }] = useContext();

  const [mappedIOs, setMappedIOs] = useState([]);

  useEffect(() => {
    setMappedIOs(
      ios
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
              label={[
                io.name,
                getGameModeValue(settings.gameMode, io.value).toLocaleString(),
                (io.unit || '') + rate,
              ].join(' ')}
            />
          );
        }),
    );
  }, [ios, settings, classes]);

  return (
    <div>
      {mappedIOs.length === 0 ? (
        <Typography>No resources found</Typography>
      ) : (
        mappedIOs
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(),
  },
  avatar: {
    height: '75%',
    width: '75%',
  },
}));

export default ResourceChips;
