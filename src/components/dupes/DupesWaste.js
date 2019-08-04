import React from 'react';

// redux
import { connect } from 'react-redux';
import { setDupeWaste } from '../../actions/dupeActions';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// components
import DupesWasteInput from './DupesWasteInput';

const styles = theme => ({
  root: {},
  title: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(),
  },
});

export class DupesWaste extends React.Component {
  render() {
    const { classes, dupes } = this.props;
    const props = [
      { name: 'pollutedWaterValue', title: 'Polluted Water' },
      { name: 'pollutedDirtValue', title: 'Polluted Dirt' },
      { name: 'waterValue', title: 'Water' },
      { name: 'dirtValue', title: 'Dirt' },
    ];

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Waste</Typography>
        </Grid>
        {props.map((prop, i) => {
          return (
            <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardContent>
                  <DupesWasteInput
                    prop={{ ...prop, value: dupes[prop.name] }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    dupes: state.calculator.dupes,
  };
};

const mapDispatchToProps = {
  setDupeWaste,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DupesWaste));
