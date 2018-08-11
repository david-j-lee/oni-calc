import React from 'react';

// redux
import { connect } from 'react-redux';
import { getTheme, setTheme } from '../../actions/uiActions';

// material
import { withStyles, ButtonBase } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';

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

const styles = theme => ({
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
});

export class ThemePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      theme: {},
      type: '',
      dialogOpen: false,
      color1: '',
      color2: '',
    };
  }

  componentWillMount() {
    this.props.getTheme();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
      this.updateButton(nextProps.theme.palette.type);
    }
  }

  changeType = () => {
    let newTheme = { ...this.state.theme };
    const newType = newTheme.palette.type === 'light' ? 'dark' : 'light';

    // set theme
    newTheme.palette.type = newType;
    this.props.setTheme(newTheme);

    this.updateButton(newType);
  };

  changeColors = (primary, secondary) => {
    let newTheme = { ...this.state.theme };

    // set new colors
    newTheme.palette.primary = primary;
    newTheme.palette.secondary = secondary;

    this.props.setTheme(newTheme);
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ color1: '', color2: '', dialogOpen: false });
  };

  handleOk = () => {
    this.changeColors(this.state.color1, this.state.color2);
    this.setState({ color1: '', color2: '', dialogOpen: false });
  };

  handleColorOneClick = () => {
    this.setState({ color1: '' });
  };

  handleColorTwoClick = () => {
    this.setState({ color2: '' });
  };

  updateButton(type) {
    // update button
    this.setState({
      icon: type === 'light' ? <Brightness2 /> : <BrightnessHigh />,
    });
  }

  selectColor = color => {
    if (this.state.color1 === '') {
      this.setState({ color1: color });
    } else if (this.state.color2 === '') {
      this.setState({ color2: color });
    }
  };

  render() {
    const { classes, fullScreen } = this.props;
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
                onClick={() => this.selectColor(color)}
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
              style={{ backgroundColor: this.props.theme.palette.primary[500] }}
            />
            <div
              className={classes.colorPreviewCircleRight}
              style={{
                backgroundColor: this.props.theme.palette.secondary[500],
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
              onClick={this.handleColorOneClick}
              className={classes.colorPreviewCircleLeft}
              style={{ backgroundColor: this.state.color1[500] }}
            />
            <ButtonBase
              onClick={this.handleColorTwoClick}
              className={classes.colorPreviewCircleRight}
              style={{ backgroundColor: this.state.color2[500] }}
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
            onClick={this.changeType}
            color="inherit"
            aria-label="Change Theme Type"
          >
            {this.state.icon}
          </IconButton>
        </Tooltip>
        <Tooltip title="Change theme colors">
          <IconButton
            onClick={this.handleDialogOpen}
            color="inherit"
            aria-label="Change Theme Colors"
          >
            <ColorLens />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          classes={{ paper: 'colors-dialog' }}
        >
          <DialogTitle id="simple-dialog-title">
            {!this.state.color1
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
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              disabled={this.state.color1 === '' || this.state.color2 === ''}
              variant="raised"
              onClick={this.handleOk}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.calculator.theme,
  };
};

const mapDispatchToProps = {
  getTheme,
  setTheme,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ThemePicker));
