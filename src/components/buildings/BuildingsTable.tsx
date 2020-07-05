import React, { FC } from 'react';
import { useContext } from '../../context';

// material
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
