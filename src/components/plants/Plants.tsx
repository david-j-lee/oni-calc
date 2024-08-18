import { useContext } from '../../context/useContext';
import Plant from './Plant';
import { css } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useCallback } from 'react';

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

  const handleRequestSort = useCallback(
    (id: string) => {
      sortPlants(id);
    },
    [sortPlants],
  );

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
