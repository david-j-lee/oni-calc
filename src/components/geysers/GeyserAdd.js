import React from 'react';

// redux
import { connect } from 'react-redux';
import { addGeyser } from '../../actions/geyserActions';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {},
  card: {
    margin: theme.spacing.unit,
  },
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  avatar: {
    height: '75%',
    width: '75%',
    backgroundSize: 'contain',
  },
  geyserSelect: {
    minWidth: 250,
  },
  geyserInfo: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  title: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
  },
  textField: {
    paddingRight: theme.spacing.unit,
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
      transform: 'translate3d(0, 0, 0)', // issue with scrollbar not working on second attempt
    },
  },
};

export class GeyserAdd extends React.Component {
  state = {
    geyserName: '',
    geyser: {},
    isValid: false,
  };

  handleSelectChange = event => {
    const geyser = this.props.geysers.listing.find(
      geyser => geyser.name === event.target.value,
    );
    this.setState({
      geyser: {
        ...geyser,
        amount: 0,
        eruptionDuration: 0,
        eruptionEvery: 0,
        activeDuration: 0,
        activeEvery: 0,
      },
      [event.target.name]: event.target.value,
    });
  };

  handleTextFieldChange = (event, prop) => {
    const newGeyser = {
      ...this.state.geyser,
      [prop]: event.target.value,
    };
    this.setState({ geyser: newGeyser });
    if (
      newGeyser.amount &&
      newGeyser.eruptionDuration &&
      newGeyser.eruptionEvery &&
      newGeyser.activeDuration &&
      newGeyser.activeEvery
    ) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  clearInputs = () => {
    this.setState({
      geyser: {
        ...this.state.geyser,
        amount: 0,
        eruptionDuration: 0,
        eruptionEvery: 0,
        activeDuration: 0,
        activeEvery: 0,
      },
      isValid: false,
    });
  };

  handleAdd = () => {
    const geyser = this.state.geyser;
    this.props.addGeyser({
      ...geyser,
      amount: Number(geyser.amount),
      eruptionDuration: Number(geyser.eruptionDuration),
      eruptionEvery: Number(geyser.eruptionEvery),
      activeDuration: Number(geyser.activeDuration),
      activeEvery: Number(geyser.activeEvery),
    });
  };

  render() {
    const { classes, geysers } = this.props;
    const { geyserName, geyser, isValid } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.geyserSelect}>
                <InputLabel htmlFor="geyser">Select a Geyser</InputLabel>
                <Select
                  displayEmpty
                  MenuProps={MenuProps}
                  value={geyserName}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    name: 'geyserName',
                    id: 'geyserName',
                  }}
                >
                  {geysers.listing.map((geyser, i) => {
                    return (
                      <MenuItem key={i} value={geyser.name}>
                        {geyser.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {geyserName !== '' && (
                <Grid container className={classes.geyserInfo}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.title}>
                      <small>Temperature</small>
                      <br />
                      {geyser.temp.value} {geyser.temp.unit}
                    </Typography>
                    <Typography className={classes.title}>
                      <small>Max Pressure</small>
                      <br />
                      {geyser.maxPressure.value} {geyser.maxPressure.unit}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.title}>
                      <small>Outputs</small>
                    </Typography>
                    {geyser.outputs.map((output, i) => {
                      const imageUrl =
                        '/images/resources/' +
                        output.name
                          .toLowerCase()
                          .split(' ')
                          .join('-') +
                        '.png';

                      return (
                        <Chip
                          key={i}
                          avatar={
                            <Avatar>
                              <div
                                className={classes.avatar}
                                style={{ backgroundImage: `url(${imageUrl})` }}
                              />
                            </Avatar>
                          }
                          label={output.name}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              )}
            </Grid>
            {geyserName !== '' && (
              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      value={geyser.amount}
                      className={classes.textField}
                      onChange={e => this.handleTextFieldChange(e, 'amount')}
                      label="Amount per eruption"
                      helperText="g/s"
                      type="number"
                      inputProps={{ style: { textAlign: 'right' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={geyser.eruptionDuration}
                      className={classes.textField}
                      onChange={e =>
                        this.handleTextFieldChange(e, 'eruptionDuration')
                      }
                      label="Eruption duration"
                      helperText="seconds"
                      type="number"
                      inputProps={{ style: { textAlign: 'right' } }}
                    />
                    <TextField
                      value={geyser.eruptionEvery}
                      className={classes.textField}
                      onChange={e =>
                        this.handleTextFieldChange(e, 'eruptionEvery')
                      }
                      label="Eruption every"
                      helperText="seconds"
                      type="number"
                      inputProps={{ style: { textAlign: 'right' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={geyser.activeDuration}
                      className={classes.textField}
                      onChange={e =>
                        this.handleTextFieldChange(e, 'activeDuration')
                      }
                      label="Active duration"
                      helperText="cycles"
                      type="number"
                      inputProps={{ style: { textAlign: 'right' } }}
                    />
                    <TextField
                      value={geyser.activeEvery}
                      className={classes.textField}
                      onChange={e =>
                        this.handleTextFieldChange(e, 'activeEvery')
                      }
                      label="Active every"
                      helperText="cycles"
                      type="number"
                      inputProps={{ style: { textAlign: 'right' } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
        {geyserName !== '' && (
          <CardActions className={classes.cardActions}>
            <Button onClick={this.clearInputs} color="primary">
              Clear
            </Button>
            {isValid && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAdd}
              >
                Add
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  geysers: state.calculator.geysers,
});

const mapDispatchToProps = {
  addGeyser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(GeyserAdd));
