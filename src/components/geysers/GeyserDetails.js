import React from 'react';

// material
import Typography from '@material-ui/core/Typography';

export default function GeyserDetails({ geyser }) {
  return (
    <div>
      <Typography>{geyser.name}</Typography>
    </div>
  );
}
