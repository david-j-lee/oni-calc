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
    setTheme(theme);
    updateButton(theme.palette.type);
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
    dialogOpen(true);
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

  const colors = [
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

  const colorPreviews = (
    <div className={classes.colorPreviews}>
      {colors.map((color, i) => {
        return (
          <div key={i} className={classes.colorPreview}>
            <ButtonBase
              onClick={() => selectColor(color)}
              style={{ backgroundColor: color[500] }}
              className={classes.colorPreviewCircle}
            />
          </div>
        );
      })}
    </div>
  );

  const selectedColors = (
    <div className={classes.selectedColors}>
      <div className={classes.selectedColorInner}>
        <div className={classes.selectedColorInnerHalf}>
          <div
            className={classes.colorPreviewCircleLeft}
            style={{ backgroundColor: theme.palette.primary[500] }}
          />
          <div
            className={classes.colorPreviewCircleRight}
            style={{
              backgroundColor: theme.palette.secondary[500],
            }}
          />
        </div>
      </div>
      <div>
        <Typography>
          <ChevronRight size="small" />
        </Typography>
      </div>
      <div>
        <div>
          <ButtonBase
            onClick={handleColorOneClick}
            className={classes.colorPreviewCircleLeft}
            style={{ backgroundColor: color1[500] }}
          />
          <ButtonBase
            onClick={handleColorTwoClick}
            className={classes.colorPreviewCircleRight}
            style={{ backgroundColor: color2[500] }}
          />
        </div>
      </div>
      <div />
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            disabled={color1 === '' || color2 === ''}
            variant="raised"
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

const useStyles = makeStyles(theme => ({
  colorsDialog: {
    maxWidth: 225,
  },
  colorsDialogContent: {
    maxWidth: 125,
    margin: '0 auto',
  },
  colorPreviews: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  colorPreview: {
    width: '25%',
    padding: '0.15rem',
  },
  colorPreviewCircle: {
    height: 25,
    width: '100%',
    borderRadius: '100%',
  },
  colorPreviewCircleLeft: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 'calc(25px/2)',
    height: 25,
  },
  colorPreviewCircleRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: 'calc(25px/2)',
    height: 25,
  },
  selectedColors: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  selectedColorInner: {
    width: '25%',
    display: 'flex',
  },
  selectedColorInnerHalf: {
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
  },
}));
