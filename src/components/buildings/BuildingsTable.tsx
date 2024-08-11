import { FC } from 'react';
import { useContext } from '../../context/context';

// material
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

// component
import BuildingsTableRow from './BuildingsTableRow';

const TABLE_HEADERS = [
  { id: 'category', label: 'Category', numeric: false },
  { id: 'name', label: 'Building', numeric: false },
  { id: 'utilization', label: 'Utilization', numeric: true },
  { id: 'quantity', label: 'Quantity', numeric: true },
  { id: 'actions', label: 'Actions', numeric: false },
];

export const BuildingsTable: FC = () => {
  const [{ buildings, buildingsOrderBy }, { sortBuildings }] = useContext();

  const handleRequestSort = (id: string) => {
    sortBuildings(id);
  };

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
