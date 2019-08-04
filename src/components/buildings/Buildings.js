import React from 'react';
import { useContext } from '../../context';

// components
import BuildingsGrid from './BuildingsGrid';
import BuildingsTable from './BuildingsTable';

export default function Buildings() {
  const [{ buildingsLayout }] = useContext;

  return (
    <div>
      {buildingsLayout === 'grid' && <BuildingsGrid />}
      {buildingsLayout === 'table' && <BuildingsTable />}
    </div>
  );
}
