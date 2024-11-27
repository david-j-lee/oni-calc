import IGeyser from '../../interfaces/IGeyser';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';

interface IProps {
  geyser: IGeyser;
}

export const GeyserDetails: FC<IProps> = memo(({ geyser }: IProps) => {
  return (
    <div>
      <Typography>{geyser.name}</Typography>
    </div>
  );
});

GeyserDetails.displayName = 'GeyserDetails';

export default GeyserDetails;
