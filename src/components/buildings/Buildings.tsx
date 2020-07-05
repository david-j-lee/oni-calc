import React, { FC } from 'react';
import { useContext } from '../../context';

// components
import BuildingsGrid from './BuildingsGrid';
import BuildingsTable from './BuildingsTable';

import DelayedLoader from './../common/DelayedLoader';

export const Buildings: FC = () => {
  const [{ buildingsLayout }] = useContext();

  return (
    <DelayedLoader>
      {buildingsLayout === 'grid' && <BuildingsGrid />}
      {buildingsLayout === 'table' && <BuildingsTable />}
    </DelayedLoader>
  );
};

export default Buildings;
