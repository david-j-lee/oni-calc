import { useContext } from '../../context/useContext';
import Plant from './Plant';
import { css, Theme } from '@emotion/react';
import { Grid } from '@mui/material';

export const Plants = () => {
  const [{ plants }] = useContext();
  return (
    <div css={rootCss}>
      <Grid container>
        {plants?.map((plant, i) => {
          return (
            <Grid
              key={i}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              css={itemCss}
            >
              <Plant plant={plant} />
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

const itemCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  });

export default Plants;
