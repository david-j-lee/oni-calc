import { FC } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// components
import DupeTrait from './DupeTrait';

export const DupeTraits: FC = () => {
  const [{ dupes }] = useContext();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography css={titleCss}>Traits</Typography>
      </Grid>
      {dupes.traits.map((trait, i) => {
        return (
          <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <div css={dupeCss}>
              <DupeTrait trait={trait} />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

const titleCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  });

const dupeCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default DupeTraits;
