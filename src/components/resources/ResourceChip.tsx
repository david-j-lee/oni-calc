import { useContext } from '../../context/useContext';
import IIO, { IIOBase } from './../../interfaces/IIO';
import { getGameModeValue } from './../../utils/commonUtils';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Theme } from '@mui/material/styles';
import { FC, useMemo } from 'react';

interface IProps {
  io: IIO | IIOBase;
  align?: 'left' | 'right';
}

export const ResourceChip: FC<IProps> = ({ io, align = 'left' }) => {
  const [{ settings }] = useContext();

  const backgroundImgCss = useMemo(() => {
    const imgUrl = `/images/resources/${io.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    const backgroundImgCss = css({
      background: `url(${imgUrl}) no-repeat center center`,
      backgroundSize: 'contain',
    });

    return backgroundImgCss;
  }, [io]);

  const rate = useMemo(
    () =>
      io.unit ? io.rate?.replace('per ', '/').replace('second', 's') : io.rate,
    [io],
  );

  return (
    <Chip
      css={[chipCss, align === 'left' ? chipLeftCss : chipRightCss]}
      avatar={
        <Avatar>
          <div css={[avatarCss, backgroundImgCss]} />
        </Avatar>
      }
      label={[
        io.name,
        getGameModeValue(
          settings.gameMode,
          'valueExtended' in io ? io.valueExtended : io.value,
        ).toLocaleString(),
        (io.unit || '') + rate,
      ].join(' ')}
    />
  );
};

const chipCss = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(),
  });

const chipLeftCss = (theme: Theme) =>
  css({
    '&:not(:last-child)': {
      marginRight: theme.spacing(),
    },
  });

const chipRightCss = (theme: Theme) =>
  css({
    '&:not(:last-child)': {
      marginLeft: theme.spacing(),
    },
  });

const avatarCss = css({
  height: '75%',
  width: '75%',
});

export default ResourceChip;
