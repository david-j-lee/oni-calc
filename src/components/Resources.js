import React from 'react';

// redux
import { connect } from 'react-redux';
import { sortResourceUsage } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import Resource from './Resource';

const styles = theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing.unit,
  },
})

export class Resources extends React.Component {
  mapResourceToElement = (resources) => {
    return resources.map((resource, index) => {
      return (
        <Resource key={index} resource={resource} />
      )
    })
  }

  handleRequestSort = id => {
    this.props.sortResourceUsage(id);
  }

  getTableHeaders() {
    const { classes } = this.props;
    const tableHeaders = [
      { id: 'name', label: 'Resource', numeric: false },
      { id: 'totalInput', label: 'Input', numeric: true },
      { id: 'totalOutput', label: 'Output', numeric: true },
      { id: 'totalIO', label: 'Net', numeric: true },
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
                  active={this.props.resourcesOrderBy === header.id}
                  direction={this.props.resourcesOrder}
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
    // const { classes } = this.props;
    const resources = this.mapResourceToElement(this.props.resources);

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Resources</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            {this.getTableHeaders()}
            <TableBody>
              {resources}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = state => {
  return {
    resources: state.calculator.resources,
    resourcesOrder: state.calculator.resourcesOrder,
    resourcesOrderBy: state.calculator.resourcesOrderBy,
  }
}

const mapDispatchToProps = {
  sortResourceUsage
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Resources))