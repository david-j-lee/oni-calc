import React, { FC, memo, useState, useRef } from 'react';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';

import IResource from './../../interfaces/IResource';

import ResourceIOs from './ResourceIOs';
import Number from '../common/Number';
import Chip from '@material-ui/core/Chip';

interface IProps {
  resource: IResource;
}

export const Resource: FC<IProps> = memo(({ resource }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogType, setDialogType] = useState('');

  //FIXME this ref seems to be stucking with the image, even when the resource name change (from hide/showing empty resources)
  const imageUrl = useRef(
    `/images/resources/${resource.name.toLowerCase().split(' ').join('-')}.png`,
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
          {!resource.unitOfMeasure ? null :
            <Chip
              label={resource.unitOfMeasure}
              size="small"
            />}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={resource.totalInput? classes.io : classes.emptyIo}
          onMouseOver={(e) => handlePopoverOpen(e, 'Inputs', 'inputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalInput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={resource.totalOutput? classes.io : classes.emptyIo}
          onMouseOver={(e) => handlePopoverOpen(e, 'Outputs', 'outputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalOutput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" className={classes.tableCell}>
        <div
          className={resource.totalIO? classes.io : classes.emptyIo}
          onMouseOver={(e) => handlePopoverOpen(e, 'Inputs or Outputs', 'both')}
          onMouseOut={handlePopoverClose}
        >
          <Number value={Math.round(resource.totalIO)} />
        </div>
      </TableCell>
    </TableRow>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
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
    '& .MuiChip-root': {
      marginLeft: theme.spacing(),
    }
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
  emptyIo: {
    cursor: 'default',
    color: theme.palette.text.disabled,
  },
  popover: {
    pointerEvents: 'none',
  },
}));

export default Resource;
