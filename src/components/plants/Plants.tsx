import { useContext } from '../../context/useContext';
import IOGrid from '../ui/IOGrid';
import Plant from './Plant';

export const Plants = () => {
  const [{ plants }] = useContext();
  return (
    <IOGrid>
      {plants?.map((plant) => <Plant key={plant.name} entity={plant} />)}
    </IOGrid>
  );
};

export default Plants;
