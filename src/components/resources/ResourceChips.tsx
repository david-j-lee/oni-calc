import IIO from './../../interfaces/IIO';
import ResourceChip from './ResourceChip';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface IProps {
  ios: IIO[];
}

export const ResourceChips: FC<IProps> = ({ ios }) => {
  return (
    <div>
      {ios.length === 0 ? (
        <Typography>No resources found</Typography>
      ) : (
        ios.map((io, index) => <ResourceChip key={index} io={io} />)
      )}
    </div>
  );
};

export default ResourceChips;
