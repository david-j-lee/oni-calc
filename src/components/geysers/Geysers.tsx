import { useContext } from '../../context/context';
import Geyser from './Geyser';
import GeyserAdd from './GeyserAdd';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

export const Geysers: FC = () => {
  const [{ geysers }] = useContext();

  return (
    <div css={rootCss}>
      <Grid container>
        <Grid item xs={12}>
          <GeyserAdd />
        </Grid>
        {geysers.inputted.map((geyser, i) => {
          return (
            <Grid key={i} item xs={12} lg={6} css={geyserCss}>
              <Geyser geyser={geyser} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  });

const geyserCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default Geysers;
