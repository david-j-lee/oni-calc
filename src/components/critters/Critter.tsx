import { useContext } from '../../context/useContext';
import IIOEntity from '../../interfaces/IIOEntity';
import IOGridCard from '../ui/IOGridCard';
import CritterDetails from './CritterDetails';

interface IProps {
  critter: IIOEntity;
}

export const Critter = ({ critter }: IProps) => {
  const [, { setCritterQuantity }] = useContext();
  return (
    <IOGridCard record={critter} setQuantity={setCritterQuantity}>
      <CritterDetails critter={critter} />
    </IOGridCard>
  );
};

export default Critter;
