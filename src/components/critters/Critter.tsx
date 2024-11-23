import { useContext } from '../../context/useContext';
import IIOEntity from '../../interfaces/IIOEntity';
import IOGridCard from '../ui/IOGridCard';
import CritterDetails from './CritterDetails';

interface IProps {
  critter: IIOEntity;
}

export const Critter = ({ critter }: IProps) => {
  const [
    ,
    { setCritterQuantity, setCritterUtilization, setCritterVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      record={critter}
      setQuantity={setCritterQuantity}
      setUtilization={setCritterUtilization}
      setVariantUtilization={setCritterVariantUtilization}
    >
      <CritterDetails critter={critter} />
    </IOGridCard>
  );
};

export default Critter;
