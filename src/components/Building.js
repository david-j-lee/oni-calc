import React from 'react';

// redux
import { connect } from 'react-redux';
import { setBuildingQuantity } from '../actions/calculatorActions';

// material
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// component
import ResourceChips from './ResourceChips';

const styles = theme => ({
  root: {
    height: '100%',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing.unit * 2,
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cover: {
    width: 60,
    backgroundSize: 'contain',
    backgroundColor: '#3E4357',
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing.unit,
    textAlign: 'right',
  },
  category: {
    display: 'flex',
    alignItems: 'center',
  },
  categoryImage: {
    display: 'inline-block',
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
  },
  dialog: {
    maxWidth: 500,
  },
  dialogImage: {
    width: 160,
    height: 160,
  },
  dialogHeading: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialogHeadingContent: {
    paddingTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: 0,
    width: 500 - 160,
    flexGrow: 1,
  },
  dialogTitle: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
  },
});

export class Building extends React.Component {
  timer = 0;

  state = {
    quantity: this.props.building.quantity,
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity !== nextProps.building.quantity) {
      this.setState({ quantity: nextProps.building.quantity });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setBuildingQuantity(this.props.building, this.state.quantity);
    }, 500);
  }

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setBuildingQuantity(
          this.props.building, this.state.quantity);
      }, 500);
    }
  }

  render() {
    const { classes, fullScreen } = this.props;
    const { name, category, power, capacity, inputs, outputs } = this.props.building;
    const { quantity } = this.state;
    const imgUrl = '/images/buildings/' +
      name.toLowerCase().split(' ').join('-') + '.png';
    const categoryImgUrl = '/images/building-categories/' +
      category.toLowerCase().split(' ').join('-') + '.png';
    const wikLink = 'https://oxygennotincluded.gamepedia.com/' +
      name.split('-').join('_'); // may need to hard code as json

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <div className={classes.dialog}>
            <div className={classes.dialogHeading}>
              <div
                className={classes.dialogImage}
                style={{ backgroundImage: `url(${imgUrl})` }} />
              <div className={classes.dialogHeadingContent}>
                <Typography variant="display1" id="responsive-dialog-title">
                  {name}
                </Typography>
                <Typography className={classes.category}>
                  <span
                    className={classes.categoryImage}
                    style={{ backgroundImage: `url(${categoryImgUrl})` }} />
                  {category}
                </Typography>
              </div>
            </div>
            <DialogContent>
              <Typography variant="body1" className={classes.dialogTitle}>
                <small>Power </small><br />
                {(power.generation || 0) - (power.usage || 0)}{" "}
                {power.unit || ''} {" "}
                (+{power.generation || 0}/-{power.usage || 0})
              </Typography>
              {capacity.power.unit === undefined ? '' :
                <Typography variant="body1" className={classes.dialogTitle}>
                  <small>Power Capacity </small><br />
                  {capacity.power.value + ' ' + capacity.power.unit}
                </Typography>
              }
              {capacity.resources.unit === undefined ? '' :
                <Typography variant="body1" className={classes.dialogTitle}>
                  <small>Resource Capacity </small><br />
                  {capacity.resources.value + ' ' + capacity.resources.unit}
                </Typography>
              }
              <Typography variant="subheading" className={classes.dialogTitle}>
                Inputs
              </Typography>
              <ResourceChips ios={inputs} type="Inputs" />
              <Typography variant="subheading" className={classes.dialogTitle}>
                Outputs
            </Typography>
              <ResourceChips ios={outputs} type="Outputs" />
            </DialogContent>
            <DialogActions>
              <Button target="_blank" href={wikLink} color="primary">
                WIKI
            </Button>
              <Button
                variant="contained"
                onClick={this.handleClose}
                color="primary"
                autoFocus>
                CLOSE
            </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={imgUrl}
            title={name} />
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography variant="title" className={classes.cardContentTitle}>
                {name}
              </Typography>
              {/* <Tooltip title="More"> */}
              <IconButton onClick={this.handleClickOpen}>
                <MoreVert />
              </IconButton>
              {/* </Tooltip> */}
            </CardContent>
            <CardActions>
              {/* <Tooltip title="Decrease"> */}
              <IconButton
                color="secondary"
                className={classes.button}
                aria-label="Decrement"
                onClick={this.decrement}>
                <ArrowDropDown />
              </IconButton>
              {/* </Tooltip> */}
              <Typography variant="title" className={classes.quantity}>
                {quantity}
              </Typography>
              {/* <Tooltip title="Increase"> */}
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="Increment"
                onClick={this.increment}>
                <ArrowDropUp />
              </IconButton>
              {/* </Tooltip> */}
            </CardActions>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // updateBuildings: state.calculator.updateBuildings,
  };
}

const mapDispatchToProps = {
  setBuildingQuantity,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Building));