import { useContext } from '../../context/useContext';
import IOGridCard, { IEntityProps } from '../ui/IOGridCard';
import PlantDetails from './PlantDetails';

export const Plant = ({ entity }: IEntityProps) => {
  const [
    ,
    { setPlantQuantity, setPlantUtilization, setPlantVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      entity={entity}
      setQuantity={setPlantQuantity}
      setUtilization={setPlantUtilization}
      setVariantUtilization={setPlantVariantUtilization}
      EntityDetails={PlantDetails}
    />
  );
};

export default Plant;
