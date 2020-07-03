import React, { memo } from 'react';

// material
import Typography from '@material-ui/core/Typography';

export const GeyserDetails = memo(({ geyser }) => {
  return (
    <div>
      <Typography>{geyser.name}</Typography>
    </div>
  );
});

export default GeyserDetails;
