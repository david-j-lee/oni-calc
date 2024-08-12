import FoodDupes from './FoodDupes';
import FoodItems from './FoodItems';
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import { FC, memo } from 'react';

export const Food: FC = memo(() => {
  return (
    <div css={rootCss}>
      <FoodDupes />
      <FoodItems />
    </div>
  );
});

const rootCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  });

export default Food;
