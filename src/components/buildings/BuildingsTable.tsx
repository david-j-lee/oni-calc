import { useContext } from '../../context/useContext';
import BuildingsTableRow from './BuildingsTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { FC, useCallback } from 'react';

const TABLE_HEADERS = [
  { id: 'category', label: 'Category', numeric: false },
  { id: 'name', label: 'Building', numeric: false },
  { id: 'utilization', label: 'Utilization', numeric: true },
  { id: 'quantity', label: 'Quantity', numeric: true },
  { id: 'actions', label: '', numeric: false },
];

export const BuildingsTable: FC = () => {
  const [{ buildings, buildingsOrderBy }, { sortBuildings }] = useContext();

  const handleRequestSort = useCallback(
    (id: string) => {
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
              <TableCell
                key={header.id}
                align={header.numeric ? 'right' : 'left'}
              >
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
