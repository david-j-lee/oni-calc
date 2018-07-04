import React from 'react';

// redux
import { connect } from 'react-redux';
import { sortBuildings } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// component
import BuildingsTableRow from './BuildingsTableRow';
// import Building from './Building';

const styles = theme => ({
});

export class BuildingsTable extends React.Component {

  handleRequestSort = id => {
    this.props.sortBuildings(id);
  }

  getTableHeaders() {
    const tableHeaders = [
      { id: 'category', label: 'Category', numeric: false },
      { id: 'name', label: 'Building', numeric: false },
      { id: 'quantity', label: 'Quantity', numeric: true },
      { id: 'actions', label: 'Actions', numeric: false },
    ];
    return (
      <TableHead>
        <TableRow>
          {tableHeaders.map(header => {
            return (
              <TableCell
                key={header.id}
                numeric={header.numeric}>
                <TableSortLabel
                  active={this.props.buildingsOrderBy === header.id}
                  direction={this.props.buildingsOrder}
                  onClick={() => this.handleRequestSort(header.id)}>
                  {header.label}
                </TableSortLabel>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }

  render() {
    const { buildings } = this.props;

    return (
      <Table>
        {this.getTableHeaders()}
        <TableBody>
          {buildings.map(building => {
            return (
              <BuildingsTableRow key={building.name} building={building} />);
          })}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    buildings: state.calculator.buildings,
    buildingsOrderBy: state.calculator.buildingsOrderBy,
    buildingsOrder: state.calculator.buildingsOrder,
  }
}

const mapDispatchToProps = {
  sortBuildings
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingsTable));