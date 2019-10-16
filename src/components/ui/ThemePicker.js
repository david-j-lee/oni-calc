import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

import Brightness2 from '@material-ui/icons/Brightness2';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';

// material icons
import ChevronRight from '@material-ui/icons/ChevronRight';
import ColorLens from '@material-ui/icons/ColorLens';

// material colors
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const COLORS = [
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
];

export default function ThemePicker() {
  const classes = useStyles();
  const [{ theme }, { getTheme, setTheme }] = useContext();

  const [icon, setIcon] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  useEffect(() => {
    if (theme) {
      setTheme(theme);
      updateButton(theme.palette.type);
    }
  }, [getTheme, setTheme, theme]);

  const changeType = () => {
    let newTheme = { ...theme };
    const newType = newTheme.palette.type === 'light' ? 'dark' : 'light';

    // set theme
    newTheme.palette.type = newType;
    setTheme(newTheme);

    updateButton(newType);
  };

  const changeColors = (primary, secondary) => {
    let newTheme = { ...theme };

    // set new colors
    newTheme.palette.primary = primary;
    newTheme.palette.secondary = secondary;

    setTheme(newTheme);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setColor1('');
    setColor2('');
    setDialogOpen(false);
  };

  const handleOk = () => {
    changeColors(color1, color2);
    setColor1('');
    setColor2('');
    setDialogOpen(false);
  };

  const handleColorOneClick = () => {
    setColor1('');
  };

  const handleColorTwoClick = () => {
    setColor2('');
  };

  const updateButton = type => {
    // update button
    setIcon(type === 'light' ? <Brightness2 /> : <BrightnessHigh />);
  };

  const selectColor = color => {
    if (color1 === '') {
      setColor1(color);
    } else if (color2 === '') {
      setColor2(color);
    }
  };

  const colorPreviews = (
    <div className={classes.colorPreviews}>
      {COLORS.map((color, i) => {
        return (
          <div key={i} className={classes.colorPreview}>
            <ButtonBase
              onClick={() => selectColor(color)}
              style={{ backgroundColor: color[500] }}
              className={classes.colorPreviewButton}
            />
          </div>
        );
      })}
    </div>
  );

  const selectedColors = (
    <div className={classes.selectedColors}>
      <div className={classes.selectedColor}>
        <div className={classes.selectedColorInner}>
          <div
            className={classes.colorPreviewHalf}
            style={{ backgroundColor: theme ? theme.palette.primary[500] : '' }}
          />
          <div
            className={classes.colorPreviewHalf}
            style={{
              backgroundColor: theme ? theme.palette.secondary[500] : '',
            }}
          />
        </div>
      </div>
      <div className={classes.chevron}>
        <Typography>
          <ChevronRight size="small" />
        </Typography>
      </div>
      <div className={classes.selectedColor}>
        <div className={classes.selectedColorInner}>
          <ButtonBase
            onClick={handleColorOneClick}
            className={[
              classes.colorPreviewHalf,
              classes.colorPreviewLeft,
            ].join(' ')}
            style={{ backgroundColor: color1[500] }}
          />
          <ButtonBase
            onClick={handleColorTwoClick}
            className={[
              classes.colorPreviewHalf,
              classes.colorPreviewRight,
            ].join(' ')}
            style={{ backgroundColor: color2[500] }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title={'Change theme type'}>
        <IconButton
          onClick={changeType}
          color="inherit"
          aria-label="Change Theme Type"
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Tooltip title="Change theme colors">
        <IconButton
          onClick={handleDialogOpen}
          color="inherit"
          aria-label="Change Theme Colors"
        >
          <ColorLens />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        classes={{ paper: 'colors-dialog' }}
      >
        <DialogTitle id="simple-dialog-title">
          {!color1
            ? 'Select Primary Color Scheme'
            : 'Select Secondary Color Scheme'}
        </DialogTitle>
        <DialogContent>
          <div className={classes.colorsDialogContent}>
            {colorPreviews}
            {selectedColors}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="text">
            Cancel
          </Button>
          <Button
            disabled={color1 === '' || color2 === ''}
            variant="contained"
            onClick={handleOk}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const SIZE = 40;
const SPACING = 1;

const useStyles = makeStyles(theme => ({
  colorsDialog: {
    maxWidth: 225,
  },
  colorsDialogContent: {
    maxWidth: (SIZE + SPACING * 2) * 4,
    margin: '0 auto',
  },
  colorPreviews: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  colorPreview: {
    padding: SPACING,
  },
  colorPreviewButton: {
    height: SIZE,
    width: SIZE,
    transition: 'all 300ms ease',
    '&:hover': {
      borderRadius: '100%',
    },
  },
  colorPreviewHalf: {
    width: `calc(${SIZE}px/2)`,
    height: SIZE,
    transition: 'all 300ms ease',
  },
  colorPreviewLeft: {
    '&:hover': {
      borderTopLeftRadius: SIZE,
      borderBottomLeftRadius: SIZE,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  colorPreviewRight: {
    '&:hover': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: SIZE,
      borderBottomRightRadius: SIZE,
    },
  },
  selectedColors: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'nowrap',
  },
  selectedColor: {
    width: SIZE,
  },
  selectedColorInner: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: SIZE,
    padding: SPACING,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
