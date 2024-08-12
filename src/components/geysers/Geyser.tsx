import { useContext } from '../../context/useContext';
import IGeyserInput from './../../interfaces/IGeyserInput';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo } from 'react';

interface IProps {
  geyser: IGeyserInput;
}

export const Geyser: FC<IProps> = memo(({ geyser }) => {
  const [, { deleteGeyser }] = useContext();

  const handleDelete = () => {
    deleteGeyser(geyser);
  };

  return (
    <div css={rootCss}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{geyser.name}</Typography>
          {geyser.outputs.length > 0 &&
            geyser.outputs.map((output, i) => {
              const imageUrl = `/images/resources/${output.name
                .toLowerCase()
                .split(' ')
                .join('-')}.png`;

              return (
                <Chip
                  key={i}
                  css={chipCss}
                  label={[output.name, geyser.amount].join(' ') + ' g/s'}
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
                />
              );
            })}
          <Typography>
            Eruption for {geyser.eruptionDuration} seconds every{' '}
            {geyser.eruptionEvery} seconds
          </Typography>
          <Typography>
            Active for {geyser.activeDuration} cycles every {geyser.activeEvery}{' '}
            cycles
          </Typography>
        </CardContent>
        <CardActions css={cardActionsCss}>
          <Button onClick={handleDelete}>DELETE</Button>
        </CardActions>
      </Card>
    </div>
  );
});

const rootCss = css({
  height: '100%',
});

const cardActionsCss = css({
  justifyContent: 'flex-end',
});

const chipCss = (theme: Theme) =>
  css({
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  });

const avatarCss = css({
  height: '75%',
  width: '75%',
});

export default Geyser;
