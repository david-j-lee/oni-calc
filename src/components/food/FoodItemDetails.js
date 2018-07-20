import React from 'react';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

// components
import ResourceChips from '../resources/ResourceChips';

const styles = theme => ({
  root: {
    minWidth: 400,
  },
  image: {
    width: 160,
    height: 160,
  },
  heading: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  headingContent: {
    paddingTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: 0,
    width: 500 - 160,
    flexGrow: 1,
  },
  title: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
  },
  content: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
});

export class FoodItemDetail extends React.Component {
  render() {
    const { classes, item } = this.props;

    const imgUrl = `/images/resources/${item.name
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
            <Typography variant="title">{item.name}</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.title}>
                  <small>Calories</small>
                  <br />
                  {item.calories}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.title}>
                  <small>Quality</small>
                  <br />
                  {item.quality}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.content}>
          <Typography variant="subheading" className={classes.title}>
            Requirements
          </Typography>
          {item.requirements.length === 0 ? (
            <Typography>No requirements found</Typography>
          ) : (
            item.requirements.map((requirement, i) => (
              <Chip key={i} className={classes.chip} label={requirement.name} />
            ))
          )}
          <Typography variant="subheading" className={classes.title}>
            Inputs
          </Typography>
          <ResourceChips ios={item.inputs} type="Inputs" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FoodItemDetail);
