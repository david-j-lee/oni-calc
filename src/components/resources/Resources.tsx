import { useContext } from '../../context/useContext';
import IResource from './../../interfaces/IResource';
import Resource from './Resource';
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

export const Resources: FC = () => {
  const [
    {
      settings: { hideEmpty },
      resources,
      resourcesOrder,
      resourcesOrderBy,
    },
    { sortResources },
  ] = useContext();

  const handleRequestSort = useCallback(
    (id: string) => {
      sortResources(id);
    },
    [sortResources],
  );

  const mapResourceToElement = useCallback(
    (resources: IResource[]) => {
      return resources
        .filter(
          (resource) =>
            !hideEmpty || resource.totalInput || resource.totalOutput,
        )
        .map((resource, i) => {
          return <Resource key={i} resource={resource} />;
        });
    },
    [hideEmpty],
  );

  const getTableHeaders = useCallback(() => {
    const tableHeaders = [
      { id: 'name', label: 'Resource', numeric: false },
      { id: 'totalInput', label: 'Input', numeric: true },
      { id: 'totalOutput', label: 'Output', numeric: true },
      { id: 'totalIO', label: 'Net', numeric: true },
    ];
    return (
      <TableHead>
        <TableRow css={tableRowCss}>
          {tableHeaders.map((header) => {
            return (
              <TableCell
                key={header.id}
                css={tableCellCss}
                align={header.numeric ? 'right' : 'left'}
              >
                <TableSortLabel
                  active={resourcesOrderBy === header.id}
                  direction={resourcesOrder}
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
  }, [resourcesOrderBy, resourcesOrder, handleRequestSort]);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Resources</Typography>
      </AccordionSummary>
      <AccordionDetails css={accordionDetailsCss} className="styled-scrollbar">
        <Table>
          {getTableHeaders()}
          <TableBody>{mapResourceToElement(resources)}</TableBody>
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

const accordionDetailsCss = css({
  overflowX: 'auto',
  overflowY: 'hidden',
});

export default Resources;
