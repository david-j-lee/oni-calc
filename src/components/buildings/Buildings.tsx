import { useContext } from '../../context/useContext';
import BuildingsGrid from './BuildingsGrid';
import BuildingsTable from './BuildingsTable';
import { FC, Fragment } from 'react';

export const Buildings: FC = () => {
  const [{ buildingsLayout }] = useContext();

  return (
    <Fragment>
      {buildingsLayout === 'grid' && <BuildingsGrid />}
      {buildingsLayout === 'table' && <BuildingsTable />}
    </Fragment>
  );
};

export default Buildings;
