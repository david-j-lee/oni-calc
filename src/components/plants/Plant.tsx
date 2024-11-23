import { useContext } from '../../context/useContext';
import IPlant from '../../interfaces/IPlant';
import IOGridCard from '../ui/IOGridCard';
import PlantDetails from './PlantDetails';

interface IProps {
  plant: IPlant;
}

export const Plant = ({ plant }: IProps) => {
  const [, { setPlantQuantity }] = useContext();
  return (
    <IOGridCard record={plant} setQuantity={setPlantQuantity}>
      <PlantDetails plant={plant} />
    </IOGridCard>
  );
};

export default Plant;
