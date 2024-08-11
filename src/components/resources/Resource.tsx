import { FC, memo, useState, useRef } from 'react';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Popover from '@mui/material/Popover';

import IResource from './../../interfaces/IResource';

import ResourceIOs from './ResourceIOs';
import Number from '../common/Number';
import Chip from '@mui/material/Chip';

interface IProps {
  resource: IResource;
}

export const Resource: FC<IProps> = memo(({ resource }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogType, setDialogType] = useState('');

  //FIXME this ref seems to be stucking with the image, even when the resource name change (from hide/showing empty resources)
  const imageUrl = useRef(
    `/images/resources/${resource.name.toLowerCase().split(' ').join('-')}.png`,
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLDivElement>,
    title: string,
    type: string,
  ) => {
    setAnchorEl(event.currentTarget);
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
    <TableRow css={tableRowCss}>
      <Popover
        css={popoverCss}
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

      <TableCell css={tableCellCss}>
        <div css={resourceNameCss}>
          <div
            css={imageCss}
            style={{ backgroundImage: `url(${imageUrl.current})` }}
          />
          {resource.name}
          {!resource.unitOfMeasure ? null : (
            <Chip label={resource.unitOfMeasure} size="small" />
          )}
        </div>
      </TableCell>

      <TableCell align="right" css={tableCellCss}>
        <div
          css={resource.totalInput ? ioCss : emptyIoCss}
          onMouseOver={(e) => handlePopoverOpen(e, 'Inputs', 'inputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalInput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" css={tableCellCss}>
        <div
          css={resource.totalOutput ? ioCss : emptyIoCss}
          onMouseOver={(e) => handlePopoverOpen(e, 'Outputs', 'outputs')}
          onMouseOut={handlePopoverClose}
        >
          {Math.round(resource.totalOutput).toLocaleString()}
        </div>
      </TableCell>

      <TableCell align="right" css={tableCellCss}>
        <div
          css={resource.totalIO ? ioCss : emptyIoCss}
          onMouseOver={(e) => handlePopoverOpen(e, 'Inputs or Outputs', 'both')}
          onMouseOut={handlePopoverClose}
        >
          <Number value={Math.round(resource.totalIO)} />
        </div>
      </TableCell>
    </TableRow>
  );
});

const tableRowCss = css({
  height: 'inherit',
});

const tableCellCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

const resourceNameCss = (theme: Theme) =>
  css({
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    '& .MuiChip-root': {
      marginLeft: theme.spacing(),
    },
  });

const imageCss = (theme: Theme) =>
  css({
    height: 15,
    width: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
    flexShrink: 0,
  });

const ioCss = css({
  cursor: 'default',
});

const emptyIoCss = (theme: Theme) =>
  css({
    cursor: 'default',
    color: theme.palette.text.disabled,
  });

const popoverCss = css({
  pointerEvents: 'none',
});

export default Resource;
