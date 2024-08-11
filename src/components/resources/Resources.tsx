import { FC } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
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

import IResource from './../../interfaces/IResource';

// components
import Resource from './Resource';

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

  const handleRequestSort = (id: string) => {
    sortResources(id);
  };

  const mapResourceToElement = (resources: IResource[]) => {
    return resources
      .filter(
        (resource) => !hideEmpty || resource.totalInput || resource.totalOutput,
      )
      .map((resource, i) => {
        return <Resource key={i} resource={resource} />;
      });
  };

  const getTableHeaders = () => {
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
  };

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
