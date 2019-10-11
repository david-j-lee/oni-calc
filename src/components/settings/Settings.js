import React from 'react';

// material
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Settings() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Survival</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">No Sweat</Typography>- 1000 calories per
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
