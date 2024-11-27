import { useContext } from '../../context/useContext';
import IOGridCard, { IEntityProps } from '../ui/IOGridCard';
import CritterDetails from './CritterDetails';

export const Critter = ({ entity }: IEntityProps) => {
  const [
    ,
    { setCritterQuantity, setCritterUtilization, setCritterVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      entity={entity}
      setQuantity={setCritterQuantity}
      setUtilization={setCritterUtilization}
      setVariantUtilization={setCritterVariantUtilization}
      EntityDetails={CritterDetails}
    />
  );
};

export default Critter;
