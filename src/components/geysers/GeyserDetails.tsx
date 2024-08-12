import IGeyser from '../../interfaces/IGeyser';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';

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
