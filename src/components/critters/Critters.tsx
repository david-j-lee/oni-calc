import { useContext } from '../../context/useContext';
import IOGrid from '../ui/IOGrid';
import Critter from './Critter';

export const Critters = () => {
  const [{ critters }] = useContext();
  return (
    <IOGrid>
      {critters?.map((critter) => (
        <Critter key={critter.name} entity={critter} />
      ))}
    </IOGrid>
  );
};

export default Critters;
