import { useContext } from '../../context/useContext';
import IBuilding from '../../interfaces/IBuilding';
import BuildingsTableRow from './BuildingsTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { FC, useCallback } from 'react';

const TABLE_HEADERS = [
  { id: 'category' as keyof IBuilding, label: 'Category' },
  { id: 'name' as keyof IBuilding, label: 'Building' },
  { id: 'utilization' as keyof IBuilding, label: 'Utilization' },
  { id: 'quantity' as keyof IBuilding, label: 'Quantity' },
  { id: 'actions' as keyof IBuilding, label: '' },
];

export const BuildingsTable: FC = () => {
  const [{ buildings, buildingsOrderBy }, { sortBuildings }] = useContext();

  const handleRequestSort = useCallback(
    (id: keyof IBuilding) => {
      sortBuildings(id);
    },
    [sortBuildings],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {TABLE_HEADERS.map((header) => {
            return (
              <TableCell key={header.id}>
                <TableSortLabel
                  active={buildingsOrderBy === header.id}
                  onClick={() => handleRequestSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {buildings.map((building) => {
          return <BuildingsTableRow key={building.name} building={building} />;
        })}
      </TableBody>
    </Table>
  );
};

export default BuildingsTable;
