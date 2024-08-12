import { useContext } from '../../context/useContext';
import FoodItem from './FoodItem';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

export const FoodItems: FC = () => {
  const [{ food }] = useContext();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography css={titleCss}>Raw Food</Typography>
      </Grid>
      {food
        .filter((item) => item.isRaw && item.calories > 0)
        .map((item, i) => {
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
              <FoodItem item={item} />
            </Grid>
          );
        })}
      <Grid item xs={12}>
        <Typography css={titleCss}>Prepared Food</Typography>
      </Grid>
      {food
        .filter((item) => !item.isRaw && item.calories > 0)
        .map((item, i) => {
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
              <FoodItem item={item} />
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

const itemCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  });

export default FoodItems;
