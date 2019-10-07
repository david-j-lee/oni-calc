import React from 'react';
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

export default function BuildingsTable() {
  const [
    { buildings, buildingsOrderBy, buildingsOrder },
    { sortBuildings },
  ] = useContext();

  const handleRequestSort = id => {
    sortBuildings(id);
  };

  const getTableHeaders = () => {
    const tableHeaders = [
      { id: 'category', label: 'Category', numeric: false },
      { id: 'name', label: 'Building', numeric: false },
      { id: 'utilization', label: 'Utilization', numeric: true },
      { id: 'quantity', label: 'Quantity', numeric: true },
      { id: 'actions', label: 'Actions', numeric: false },
    ];
    return (
      <TableHead>
        <TableRow>
          {tableHeaders.map(header => {
            return (
              <TableCell key={header.id} numeric={header.numeric}>
                <TableSortLabel
                  active={buildingsOrderBy === header.id}
                  direction={buildingsOrder}
                  onClick={() => handleRequestSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <Table>
      {getTableHeaders()}
      <TableBody>
        {buildings.map(building => {
          return <BuildingsTableRow key={building.name} building={building} />;
        })}
      </TableBody>
    </Table>
  );
}

// const mapStateToProps = state => {
//   return {
//     buildings: state.calculator.buildings,
//     buildingsOrderBy: state.calculator.buildingsOrderBy,
//     buildingsOrder: state.calculator.buildingsOrder,
//   }
// }

// const mapDispatchToProps = {
//   sortBuildings
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingsTable));
