import React from 'react';

// redux
import { connect } from 'react-redux';

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
import Plant from './Plant';

const styles = theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing.unit,
  },
});

export class Plants extends React.Component {
  // handleRequestSort = id => {
  //   this.props.sortResources(id);
  // };

  mapPlantsToElement = plants => {
    return plants.map((plant, i) => {
      return <Plant key={i} plant={plant} />;
    });
  };

  getTableHeaders() {
    const { classes } = this.props;
    const tableHeaders = [
      { id: 'name', label: 'Resource', numeric: false },
      { id: 'quantity', label: 'Quantity', numeric: true },
    ];
    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          {tableHeaders.map(header => {
            return (
              <TableCell
                key={header.id}
                className={classes.tableCell}
                numeric={header.numeric}
              >
                <TableSortLabel
                  // active={this.props.resourcesOrderBy === header.id}
                  // direction={this.props.resourcesOrder}
                  // onClick={() => this.handleRequestSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }

  render() {
    // const { classes } = this.props;
    const plants = this.mapPlantsToElement(this.props.plants);

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Plants</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            {this.getTableHeaders()}
            <TableBody>{plants}</TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapStateToProps = state => ({
  plants: state.calculator.plants,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Plants));
