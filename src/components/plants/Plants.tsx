import { FC } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Theme } from '@mui/material/styles';

// components
import Plant from './Plant';

const TABLE_HEADERS = [
  { id: 'name', label: 'Resource', numeric: false },
  { id: 'quantity', label: 'Quantity', numeric: true },
];

export const Plants: FC = () => {
  const [
    {
      settings: { hideEmpty },
      plants,
      plantsOrderBy,
      plantsOrder,
    },
    { sortPlants },
  ] = useContext();

  const handleRequestSort = (id: string) => {
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
            <TableRow css={tableRowCss}>
              {TABLE_HEADERS.map((header) => {
                return (
                  <TableCell
                    key={header.id}
                    css={tableCellCss}
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
            {plants
              .filter((plant) => !hideEmpty || plant.quantity)
              .map((plant, i) => (
                <Plant key={i} plant={plant} />
              ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

const tableRowCss = css({
  height: 'inherit',
});

const tableCellCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

export default Plants;
