import React, { FC, useEffect, useState } from 'react';
import { useContext } from '../../context';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import IIO from './../../interfaces/IIO';

import { getGameModeValue } from './../../utils/commonUtils';

interface IProps {
  ios: IIO[];
}

export const ResourceChips: FC<IProps> = ({ ios }) => {
  const classes = useStyles();
  const [{ settings }] = useContext();

  const [mappedIOs, setMappedIOs] = useState<any[]>([]);

  useEffect(() => {
    setMappedIOs(
      ios
        .sort((a: any, b: any) => {
          return a.name - b.name;
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

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginRight: theme.spacing(),
  },
  avatar: {
    height: '75%',
    width: '75%',
  },
}));

export default ResourceChips;
