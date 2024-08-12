import { useContext } from '../../context/context';
import IIO from './../../interfaces/IIO';
import { getGameModeValue } from './../../utils/commonUtils';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

interface IProps {
  ios: IIO[];
}

export const ResourceChips: FC<IProps> = ({ ios }) => {
  const [{ settings }] = useContext();

  const [mappedIOs, setMappedIOs] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setMappedIOs(
      ios
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
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
              css={chipCss}
              avatar={
                <Avatar>
                  <div
                    css={avatarCss}
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
  }, [ios, settings]);

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

const chipCss = (theme: Theme) =>
  css({
    marginRight: theme.spacing(),
  });

const avatarCss = css({
  height: '75%',
  width: '75%',
});

export default ResourceChips;
