import { css, Theme } from '@emotion/react';
import { Grid } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const IOGrid = ({ children }: IProps) => {
  return (
    <div css={rootCss}>
      <Grid container>{children}</Grid>
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  });

export default IOGrid;
