import React from 'react';
import { useContext } from '../../context';

// material
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import Plant from './Plant';

const TABLE_HEADERS = [
  { id: 'name', label: 'Resource', numeric: false },
  { id: 'quantity', label: 'Quantity', numeric: true },
];

export const Plants = () => {
  const classes = useStyles();
  const [{ plants, plantsOrderBy, plantsOrder }, { sortPlants }] = useContext();

  const handleRequestSort = (id) => {
    sortPlants(id);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Plants</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableHead>
            <TableRow className={classes.tableRow}>
              {TABLE_HEADERS.map((header) => {
                return (
                  <TableCell
                    key={header.id}
                    className={classes.tableCell}
                    align={header.numeric ? 'right' : 'left'}
                  >
                    <TableSortLabel
                      active={plantsOrderBy === header.id}
                      direction={plantsOrder}
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
            {plants.map((plant, i) => (
              <Plant key={i} plant={plant} />
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
  },
}));

export default Plants;
