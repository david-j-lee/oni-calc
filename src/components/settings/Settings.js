import React, { useMemo } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// components
import DelayedLoader from './../common/DelayedLoader';

export const Settings = () => {
  const classes = useStyles();
  const [{ settings, dupes }, { setGameMode }] = useContext();

  const dupeFoodInput = useMemo(() => {
    if (dupes.inputs) {
      const foodInput = dupes.inputs.find((input) => input.name === 'Food');
      if (foodInput) {
        return foodInput.value;
      }
    }
    return null;
  }, [dupes.inputs]);

  const handleChange = (newGameMode) => {
    setGameMode(newGameMode);
  };

  return (
    <DelayedLoader>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <ButtonBase
                className={classes.button}
                onClick={() => handleChange('survival')}
              >
                <CardContent>
                  <Typography variant="h6" className={classes.title}>
                    {' '}
                    <Checkbox
                      checked={settings.gameMode === 'survival'}
                      onChange={() => handleChange('survival')}
                      value="survival"
                      inputProps={{
                        'aria-label': 'game mode survival',
                      }}
                    />
                    <span>Survival</span>
                  </Typography>
                  <ul className={classes.traits}>
                    <li>
                      {dupeFoodInput ? dupeFoodInput.survival : ''} calories per
                      dupe every cycle
                    </li>
                  </ul>
                  <ul className={classes.traits}></ul>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <ButtonBase
                className={classes.button}
                onClick={() => handleChange('no-sweat')}
              >
                <CardContent>
                  <Typography variant="h6" className={classes.title}>
                    <Checkbox
                      checked={settings.gameMode === 'no-sweat'}
                      onChange={() => handleChange('no-sweat')}
                      value="no-sweat"
                      inputProps={{
                        'aria-label': 'game mode no sweat',
                      }}
                    />
                    <span>No Sweat</span>
                  </Typography>
                  <ul className={classes.traits}>
                    <li>
                      {dupeFoodInput ? dupeFoodInput.noSweat : ''} calories per
                      dupe every cycle
                    </li>
                  </ul>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        </Grid>
      </div>
    </DelayedLoader>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
  },
  card: {
    height: '100%',
  },
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default Settings;
