import { useContext } from '../../context/useContext';
import IPlant from '../../interfaces/IPlant';
import IOGridCard from '../ui/IOGridCard';
import PlantDetails from './PlantDetails';

interface IProps {
  plant: IPlant;
}

export const Plant = ({ plant }: IProps) => {
  const [
    ,
    { setPlantQuantity, setPlantUtilization, setPlantVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      record={plant}
      setQuantity={setPlantQuantity}
      setUtilization={setPlantUtilization}
      setVariantUtilization={setPlantVariantUtilization}
    >
      <PlantDetails plant={plant} />
    </IOGridCard>
  );
};

export default Plant;
