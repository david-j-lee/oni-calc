import React, { FC, memo } from 'react';

// material
import Typography from '@material-ui/core/Typography';

import IGeyser from '../../interfaces/IGeyser';

interface IProps {
  geyser: IGeyser;
}

export const GeyserDetails: FC<IProps> = memo(({ geyser }) => {
  return (
    <div>
      <Typography>{geyser.name}</Typography>
    </div>
  );
});

export default GeyserDetails;
