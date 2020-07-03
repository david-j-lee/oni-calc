import React from 'react';
import { useContext } from '../../context';

// material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';

// components
import DupesWasteInput from './DupesWasteInput';

const DUPES_WASTE_PROPS = [
  { name: 'pollutedWaterValue', title: 'Polluted Water' },
  { name: 'pollutedDirtValue', title: 'Polluted Dirt' },
  { name: 'waterValue', title: 'Water' },
  { name: 'dirtValue', title: 'Dirt' },
];

export const DupesWaste = () => {
  const classes = useStyles();
  const [{ dupes }] = useContext();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.title}>Waste</Typography>
      </Grid>
      {DUPES_WASTE_PROPS.map((prop, i) => {
        return (
          <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card className={classes.card}>
              <CardContent>
                <DupesWasteInput prop={{ ...prop, value: dupes[prop.name] }} />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(),
  },
}));

export default DupesWaste;
