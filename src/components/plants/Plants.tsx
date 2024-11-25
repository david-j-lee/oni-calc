import { useContext } from '../../context/useContext';
import IOGrid from '../ui/IOGrid';
import Plant from './Plant';

export const Plants = () => {
  const [{ plants }] = useContext();
  return (
    <IOGrid>
      {plants?.map((plant) => <Plant key={plant.name} plant={plant} />)}
    </IOGrid>
  );
};

export default Plants;
