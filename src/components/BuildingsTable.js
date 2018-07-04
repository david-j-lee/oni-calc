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
import IconButton from '@material-ui/core/IconButton';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

// component
import BuildingsTableRow from './BuildingsTableRow';
// import Building from './Building';

const styles = theme => ({
  image: {
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
  buildingName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
});

export class BuildingsTable extends React.Component {

  handleRequestSort = id => {
    this.props.sortBuildings(id);
  }

  getTableHeaders() {
    const { classes } = this.props;
    const tableHeaders = [
      { id: 'category', label: 'Category', numeric: false },
      { id: 'name', label: 'Building', numeric: false },
      { id: 'quantity', label: 'Quantity', numeric: true },
      { id: 'actions', label: 'Actions', numeric: false },
    ];
    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          {tableHeaders.map(header => {
            return (
              <TableCell
                key={header.id}
                className={classes.tableCell}
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
    const { classes, buildings } = this.props;

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