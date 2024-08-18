import { useContext } from '../../context/useContext';
import IGeyserInput from './../../interfaces/IGeyserInput';
import { css } from '@emotion/react';
import { Delete } from '@mui/icons-material';
import { Grid, IconButton, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, memo, useMemo } from 'react';

interface IProps {
  geyser: IGeyserInput;
}

export const Geyser: FC<IProps> = memo(({ geyser }) => {
  const [, { deleteGeyser }] = useContext();

  const imgUrl = useMemo(
    () =>
      `/images/geysers/${geyser.name.toLowerCase().replaceAll(/[ ']/g, '-')}.webp`,
    [],
  );

  const handleDelete = () => {
    deleteGeyser(geyser);
  };

  return (
    <div css={rootCss}>
      <Card>
        <Grid container>
          <Grid item md={3}>
            <div css={imageWrapperCss}>
              <div
                css={imageCss}
                style={{
                  background: `url(${imgUrl}) no-repeat center center`,
                  backgroundSize: 'contain',
                }}
              />
            </div>
          </Grid>
          <Grid item md={9}>
            <CardContent css={cardContentCss}>
              <Stack>
                <Stack direction="row" css={cardHeaderCss}>
                  <Typography variant="h5">{geyser.name}</Typography>
                  <IconButton onClick={handleDelete}>
                    <Delete />
                  </IconButton>
                </Stack>
                <div css={descriptionCss}>
                  <Typography>
                    Eruption for <strong>{geyser.eruptionDuration}</strong>{' '}
                    seconds every <strong>{geyser.eruptionEvery}</strong>{' '}
                    seconds
                  </Typography>
                  <Typography>
                    Active for <strong>{geyser.activeDuration}</strong> cycles
                    every <strong>{geyser.activeEvery}</strong> cycles
                  </Typography>
                </div>
                <div>
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
                          label={
                            [output.name, geyser.amount].join(' ') + ' g/s'
                          }
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
                </div>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
});

const rootCss = css({
  height: '100%',
});

const cardHeaderCss = (theme: Theme) =>
  css({
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  });

const cardContentCss = (theme: Theme) =>
  css({
    paddingBottom: `${theme.spacing(2)} !important`,
  });

const descriptionCss = (theme: Theme) =>
  css({
    paddingBottom: theme.spacing(),
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

const imageWrapperCss = (theme: Theme) =>
  css({
    padding: theme.spacing(2),
    backgroundColor: '#3E4357',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

const imageCss = css({
  width: 160,
  height: 160,
});

export default Geyser;
