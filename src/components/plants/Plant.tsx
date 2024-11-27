import { useContext } from '../../context/useContext';
import IOGridCard, { IEntityDetailsProps } from '../ui/IOGridCard';
import PlantDetails from './PlantDetails';

export const Plant = ({ entity }: IEntityDetailsProps) => {
  const [
    ,
    { setPlantQuantity, setPlantUtilization, setPlantVariantUtilization },
  ] = useContext();
  return (
    <IOGridCard
      record={entity}
      setQuantity={setPlantQuantity}
      setUtilization={setPlantUtilization}
      setVariantUtilization={setPlantVariantUtilization}
      RecordDetails={PlantDetails}
    />
  );
};

export default Plant;
