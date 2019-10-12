import React from 'react';
import { useContext } from '../../context';

// material
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Settings() {
  const classes = useStyles();
  const [{ settings }, { setGameMode }] = useContext();

  const handleChange = newGameMode => {
    setGameMode(newGameMode);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Checkbox
                checked={settings.gameMode === 'survival'}
                onChange={() => handleChange('survival')}
                value="survival"
                inputProps={{
                  'aria-label': 'game mode survival',
                }}
              />
              <Typography variant="h6">Survival</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card>
            <CardContent>
              <Checkbox
                checked={settings.gameMode === 'no-sweat'}
                onChange={() => handleChange('no-sweat')}
                value="no-sweat"
                inputProps={{
                  'aria-label': 'game mode no sweat',
                }}
              />
              <Typography variant="h6">No Sweat</Typography>- 500 calories per
              dupe
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
  card: {
    height: '100%',
  },
}));
