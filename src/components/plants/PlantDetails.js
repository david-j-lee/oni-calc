import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// components
import ResourceChips from '../resources/ResourceChips';

const styles = theme => ({
  root: {},
  heading: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  headingContent: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: 0,
    width: 500 - 160,
    flexGrow: 1,
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
  content: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
  },
});

export class PlantDetails extends React.Component {
  render() {
    const { classes, plant } = this.props;

    const imgUrl = `/images/bio/${plant.name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`;

    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          <div
            className={classes.image}
            style={{
              background: `#3E4357 url(${imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
          <div className={classes.headingContent}>
            <Typography variant="title">{plant.name}</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.title}>
                  <small>Growth Rate</small>
                  <br />
                  {plant.growthRate.value} {plant.growthRate.rate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.title}>
                  <small>Yield</small>
                  <br />
                  {plant.yield}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.content}>
          <Typography variant="subheading" className={classes.title}>
            Inputs
          </Typography>
          <ResourceChips ios={plant.inputs} type="Inputs" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlantDetails);
