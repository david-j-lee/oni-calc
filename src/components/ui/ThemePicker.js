import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import Brightness2 from '@material-ui/icons/Brightness2';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';

// material icons
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
  const [{ theme }, { setTheme }] = useContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selection, setSelection] = useState('primary');
  const [color1, setColor1] = useState(theme && theme.palette.primary[500]);
  const [color2, setColor2] = useState(theme && theme.palette.secondary[500]);

  const changeType = () => {
    let newTheme = { ...theme };
    const newType = newTheme.palette.type === 'light' ? 'dark' : 'light';

    // set theme
    newTheme.palette.type = newType;
    setTheme(newTheme);
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

  const selectColor = color => {
    switch (selection) {
      case 'primary':
        setColor1(color);
        if (color2) {
          changeColors(color, color2);
        }
        break;
      case 'secondary':
        setColor2(color);
        if (color1) {
          changeColors(color1, color);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (theme) {
      if (theme.palette.primary[500]) {
        setColor1(theme.palette.primary);
      }
      if (theme.palette.secondary[500]) {
        setColor2(theme.palette.secondary);
      }
    }
  }, [theme]);

  return (
    <div>
      <Tooltip title="Change theme">
        <IconButton
          onClick={handleDialogOpen}
          color="inherit"
          aria-label="Change Theme"
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
        <DialogTitle id="theme-picker-dialog">Change Theme</DialogTitle>
        <DialogContent>
          <div>
            {theme && theme.palette.type === 'light' ? (
              <Button onClick={changeType} variant="contained" color="primary">
                <BrightnessHigh
                  className={[classes.leftIcon, classes.iconSmall].join(' ')}
                />
                Light Theme
              </Button>
            ) : (
              <Button onClick={changeType} variant="contained" color="primary">
                <Brightness2
                  className={[classes.leftIcon, classes.iconSmall].join(' ')}
                />
                Dark Theme
              </Button>
            )}
          </div>
          <div className={classes.selector}>
            <ButtonBase
              onClick={() => setSelection('primary')}
              className={classes.colorPreviewSelector}
            >
              <div
                className={classes.colorPreviewSelectorIcon}
                style={{ backgroundColor: color1 ? color1[500] : '' }}
              />
              {color1 && selection === 'primary' && (
                <div
                  className={classes.active}
                  style={{ border: `5px solid ${color1[900]}` }}
                ></div>
              )}
            </ButtonBase>
            <Typography>Primary</Typography>
          </div>
          <div className={classes.selector}>
            <ButtonBase
              onClick={() => setSelection('secondary')}
              className={classes.colorPreviewSelector}
            >
              <div
                className={classes.colorPreviewSelectorIcon}
                style={{ backgroundColor: color2 ? color2[500] : '' }}
              />
              {color2 && selection === 'secondary' && (
                <div
                  className={classes.active}
                  style={{ border: `5px solid ${color2[900]}` }}
                ></div>
              )}
            </ButtonBase>
            <Typography>Secondary</Typography>
          </div>
          <div className={classes.colorsDialogContent}>
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
          </div>
        </DialogContent>
        <DialogActions>
          <div className={classes.grow} />
          <Button onClick={handleClose} color="secondary" variant="text">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const SIZE = 40;
const SPACING = 1;

const useStyles = makeStyles(theme => ({
  colorsDialog: {},
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
  selectedColors: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'nowrap',
  },
  selectedColor: {
    width: SIZE,
  },
  selector: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
  colorPreviewSelector: {
    marginRight: theme.spacing(1),
  },
  colorPreviewSelectorIcon: {
    height: SIZE,
    width: SIZE,
  },
  active: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: 'all 300ms ease',
  },
  grow: {
    flexGrow: 1,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));
