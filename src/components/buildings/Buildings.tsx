import { FC, Fragment } from 'react';
import { useContext } from '../../context/context';

// components
import BuildingsGrid from './BuildingsGrid';
import BuildingsTable from './BuildingsTable';

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
