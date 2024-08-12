import { useContext } from '../../context/useContext';
import { css } from '@emotion/react';
import Brightness2 from '@mui/icons-material/Brightness2';
import BrightnessHigh from '@mui/icons-material/BrightnessHigh';
import Check from '@mui/icons-material/Check';
import ColorLens from '@mui/icons-material/ColorLens';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import amber from '@mui/material/colors/amber';
import blue from '@mui/material/colors/blue';
import blueGrey from '@mui/material/colors/blueGrey';
import brown from '@mui/material/colors/brown';
import cyan from '@mui/material/colors/cyan';
import deepOrange from '@mui/material/colors/deepOrange';
import deepPurple from '@mui/material/colors/deepPurple';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';
import indigo from '@mui/material/colors/indigo';
import lightBlue from '@mui/material/colors/lightBlue';
import lightGreen from '@mui/material/colors/lightGreen';
import lime from '@mui/material/colors/lime';
import orange from '@mui/material/colors/orange';
import pink from '@mui/material/colors/pink';
import purple from '@mui/material/colors/purple';
import red from '@mui/material/colors/red';
import teal from '@mui/material/colors/teal';
import yellow from '@mui/material/colors/yellow';
import { Theme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

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

export const ThemePicker: FC = () => {
  const [{ theme }, { setTheme }] = useContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selection, setSelection] = useState<'primary' | 'secondary'>(
    'primary',
  );
  const [color1, setColor1] = useState(theme && theme.palette.primary);
  const [color2, setColor2] = useState(theme && theme.palette.secondary);

  const changeType = () => {
    if (theme == null) {
      return;
    }

    const newTheme = { ...theme };

    if (!newTheme.palette) {
      return;
    }

    const newType = newTheme.palette?.mode === 'light' ? 'dark' : 'light';

    // set theme
    newTheme.palette.mode = newType;
    setTheme(newTheme);
  };

  const changeColors = (
    primary: { [key: number]: string },
    secondary: { [key: number]: string },
  ) => {
    if (!theme) {
      return;
    }

    const newTheme = { ...theme };

    if (!newTheme.palette) {
      return;
    }

    // set new colors
    newTheme.palette.primary = primary;
    newTheme.palette.secondary = secondary;

    setTheme(newTheme);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const selectColor = (color: { [key: number]: string }) => {
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
    if (theme && theme.palette) {
      if (theme.palette.primary) {
        setColor1(theme.palette.primary);
      }
      if (theme.palette.secondary) {
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
          <div css={dialogContentCss}>
            <div>
              {theme && theme.palette.mode === 'light' ? (
                <Button
                  onClick={changeType}
                  variant="contained"
                  startIcon={<BrightnessHigh />}
                >
                  Light Theme
                </Button>
              ) : (
                <Button
                  onClick={changeType}
                  variant="contained"
                  startIcon={<Brightness2 />}
                >
                  Dark Theme
                </Button>
              )}
            </div>
            <div css={selectorCss}>
              <ButtonBase
                onClick={() => setSelection('primary')}
                css={colorPreviewSelectorCss}
              >
                <div
                  css={colorPreviewSelectorIconCss}
                  style={{ backgroundColor: color1 ? color1[500] : '' }}
                />
                {color1 && selection === 'primary' && (
                  <div
                    css={activeCss}
                    style={{ border: `5px solid ${color1[900]}` }}
                  >
                    <Check style={{ color: color1[900] }} />
                  </div>
                )}
              </ButtonBase>
              <Typography
                css={titleCss}
                onClick={() => setSelection('primary')}
              >
                Primary
              </Typography>
            </div>
            <div css={selectorCss}>
              <ButtonBase
                onClick={() => setSelection('secondary')}
                css={colorPreviewSelectorCss}
              >
                <div
                  css={colorPreviewSelectorIconCss}
                  style={{ backgroundColor: color2 ? color2[500] : '' }}
                />
                {color2 && selection === 'secondary' && (
                  <div
                    css={activeCss}
                    style={{ border: `5px solid ${color2[900]}` }}
                  >
                    <Check style={{ color: color2[900] }} />
                  </div>
                )}
              </ButtonBase>
              <Typography
                css={titleCss}
                onClick={() => setSelection('secondary')}
              >
                Secondary
              </Typography>
            </div>

            <div css={colorPreviewsCss}>
              {COLORS.map((color, i) => {
                return (
                  <div key={i} css={colorPreviewCss}>
                    <ButtonBase
                      onClick={() => selectColor(color)}
                      style={{ backgroundColor: color[500] }}
                      css={colorPreviewButtonCss}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div css={growCss} />
          <Button onClick={handleClose} color="secondary" variant="text">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const SIZE = 40;
const SPACING = 1;

const dialogContentCss = (theme: Theme) =>
  css({
    maxWidth: (SIZE + SPACING * 2) * 4,
    margin: theme.spacing(0, 4),
  });

const colorPreviewsCss = css({
  display: 'flex',
  flexWrap: 'wrap',
});

const colorPreviewCss = css({
  padding: SPACING,
});

const colorPreviewButtonCss = css({
  height: SIZE,
  width: SIZE,
  transition: 'all 300ms ease',
  '&:hover': {
    borderRadius: '100%',
  },
});

const selectorCss = (theme: Theme) =>
  css({
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  });

const colorPreviewSelectorCss = (theme: Theme) =>
  css({
    marginRight: theme.spacing(1),
  });

const colorPreviewSelectorIconCss = css({
  height: SIZE,
  width: SIZE,
});

const titleCss = css({
  cursor: 'pointer',
  width: '100%',
});

const activeCss = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  transition: 'all 300ms ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const growCss = css({
  flexGrow: 1,
});

export default ThemePicker;
