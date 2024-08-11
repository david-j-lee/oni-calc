import { FC, memo } from 'react';

// material
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { css } from '@emotion/react';

import IDupes from '../../interfaces/IDupes';

// components
import ResourceChips from '../resources/ResourceChips';

interface IProps {
  details: IDupes;
}

export const DupeDetails: FC<IProps> = memo(({ details }) => {
  return (
    <div css={rootCss}>
      <Typography variant="h6">Dupe Details</Typography>
      <Typography variant="subtitle1" css={titleCss}>
        Inputs
      </Typography>
      <ResourceChips ios={details.inputs} />
      <Typography variant="subtitle1" css={titleCss}>
        Outputs
      </Typography>
      <ResourceChips ios={details.outputs} />
    </div>
  );
});

const rootCss = (theme: Theme) =>
  css({
    padding: theme.spacing(3),
    minWidth: 400,
  });

const titleCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  });

export default DupeDetails;
