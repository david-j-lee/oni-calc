import { FC, useEffect, useState } from 'react';
import { useContext } from '../../context/context';

// material
import { SerializedStyles, css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const FoodDupes: FC = () => {
  const [{ dupes, food }] = useContext();

  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesCss, setCaloriesClassName] = useState<SerializedStyles | ''>(
    '',
  );

  useEffect(() => {
    if (food.length > 0) {
      setTotalCalories(
        food
          .map((item) => item.calories * item.quantity)
          .reduce((a, b) => a + b, 0),
      );
    }
  }, [food]);

  useEffect(() => {
    setCaloriesClassName(
      totalCalories === 0 || !dupes.caloriesRequired
        ? ''
        : totalCalories >= dupes.caloriesRequired
        ? surplusCss
        : deficitCss,
    );
  }, [totalCalories, dupes]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <Card css={cardCss}>
          <CardContent>
            <Typography variant="h6" css={titleCss}>
              {dupes.quantity} Dupes
            </Typography>
            <Typography>
              <span css={caloriesCss}>{totalCalories}</span> of{' '}
              {dupes.caloriesRequired || 0} kcal/cycle
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const titleCss = (theme: Theme) =>
  css({
    paddingBottom: theme.spacing(),
  });

const cardCss = (theme: Theme) =>
  css({
    margin: theme.spacing(),
  });

const surplusCss = css({
  color: 'green',
});

const deficitCss = css({
  color: 'red',
});

export default FoodDupes;
