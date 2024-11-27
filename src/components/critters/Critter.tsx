import { useContext } from '../../context/useContext';
import IOGridCard, { IEntityDetailsProps } from '../ui/IOGridCard';
import CritterDetails from './CritterDetails';

export const Critter = ({ entity }: IEntityDetailsProps) => {
  const [
    ,
    { setCritterQuantity, setCritterUtilization, setCritterVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      record={entity}
      setQuantity={setCritterQuantity}
      setUtilization={setCritterUtilization}
      setVariantUtilization={setCritterVariantUtilization}
      RecordDetails={CritterDetails}
    />
  );
};

export default Critter;
