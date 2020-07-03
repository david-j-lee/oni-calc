import React, { useState } from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
      transform: 'translate3d(0, 0, 0)', // issue with scrollbar not working on second attempt
    },
  },
};

export const GeyserAdd = () => {
  const classes = useStyles();
  const [{ geysers }, { addGeyser }] = useContext();

  const [geyserName, setGeyserName] = useState('');
  const [geyser, setGeyser] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleSelectChange = (event) => {
    if (geysers && geysers.listing) {
      const geyser = geysers.listing.find((g) => g.name === event.target.value);
      if (geyser) {
        setGeyser({
          ...geyser,
          amount: 0,
          eruptionDuration: 0,
          eruptionEvery: 0,
          activeDuration: 0,
          activeEvery: 0,
        });
        // TODO: Confirm this is working correctly.
        setGeyserName(event.target.value);
      }
    }
  };

  const handleTextFieldChange = (event, prop) => {
    const newGeyser = {
      ...geyser,
      [prop]: event.target.value,
    };
    setGeyser(newGeyser);
    if (
      newGeyser.amount &&
      newGeyser.eruptionDuration &&
      newGeyser.eruptionEvery &&
      newGeyser.activeDuration &&
      newGeyser.activeEvery
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const clearInputs = () => {
    setGeyser({
      ...geyser,
      amount: 0,
      eruptionDuration: 0,
      eruptionEvery: 0,
      activeDuration: 0,
      activeEvery: 0,
    });
    setIsValid(false);
  };

  const handleAdd = () => {
    addGeyser({
      ...geyser,
      amount: Number(geyser.amount),
      eruptionDuration: Number(geyser.eruptionDuration),
      eruptionEvery: Number(geyser.eruptionEvery),
      activeDuration: Number(geyser.activeDuration),
      activeEvery: Number(geyser.activeEvery),
    });
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormControl className={classes.geyserSelect}>
              <InputLabel htmlFor="geyser">Select a Geyser</InputLabel>
              <Select
                displayEmpty
                MenuProps={MENU_PROPS}
                value={geyserName}
                onChange={handleSelectChange}
                inputProps={{
                  name: 'geyserName',
                  id: 'geyserName',
                }}
              >
                {geysers.listing.map((g, i) => {
                  return (
                    <MenuItem key={i} value={g.name}>
                      {g.name}
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
                      output.name.toLowerCase().split(' ').join('-') +
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
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'amount')}
                    label="Amount per eruption"
                    helperText="g/s"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Amount Per Eruption',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={geyser.eruptionDuration}
                    className={classes.textField}
                    margin="dense"
                    onChange={(e) =>
                      handleTextFieldChange(e, 'eruptionDuration')
                    }
                    label="Eruption duration"
                    helperText="seconds"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Eruption Duration',
                    }}
                  />
                  <TextField
                    value={geyser.eruptionEvery}
                    className={classes.textField}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'eruptionEvery')}
                    label="Eruption every"
                    helperText="seconds"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Eruption Every',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={geyser.activeDuration}
                    className={classes.textField}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'activeDuration')}
                    label="Active duration"
                    helperText="cycles"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Active Duration',
                    }}
                  />
                  <TextField
                    value={geyser.activeEvery}
                    className={classes.textField}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'activeEvery')}
                    label="Active every"
                    helperText="cycles"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Active Every',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
      {geyserName !== '' && (
        <CardActions className={classes.cardActions}>
          <Button onClick={clearInputs} color="primary">
            Clear
          </Button>
          {isValid && (
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(),
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
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
  textField: {
    paddingRight: theme.spacing(),
  },
}));

export default GeyserAdd;
