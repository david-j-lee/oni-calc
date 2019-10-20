import React, { useState, useRef } from 'react';

// material
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';

import ResourceIOs from './ResourceIOs';
import Number from '../common/Number';

export default function Resource({ resource }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogType, setDialogType] = useState('');

  const imageUrl = useRef(
    `/images/resources/${resource.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`,
  );

  const handlePopoverOpen = (event, title, type) => {
    setAnchorEl(event.target);
    setDialogTitle(title);
    setDialogType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setDialogTitle('');
    setDialogType('');
  };

  const dialogOpen = !!anchorEl;

  return (
    <TableRow className={classes.tableRow}>
      <Popover
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={dialogOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ResourceIOs
          resource={resource}
          title={dialogTitle}
          type={dialogType}
        />
      </Popover>

      <TableCell className={classes.tableCell}>
        <div className={classes.resourceName}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${imageUrl.current})` }}
          />
          {resource.name}
          {resource.unitOfMeasure ? ' (' + resource.unitOfMeasure + ')' : ''}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={classes.io}
          onMouseOver={e => handlePopoverOpen(e, 'Inputs', 'inputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalInput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={classes.io}
          onMouseOver={e => handlePopoverOpen(e, 'Outputs', 'outputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalOutput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={classes.io}
          onMouseOver={e => handlePopoverOpen(e, 'Inputs or Outputs', 'both')}
          onMouseOut={handlePopoverClose}
        >
          <Number value={Math.round(resource.totalIO)} />
        </div>
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles(theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
  },
  resourceName: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  image: {
    height: 15,
    width: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
    flexShrink: 0,
  },
  io: {
    cursor: 'default',
  },
  popover: {
    pointerEvents: 'none',
  },
}));
