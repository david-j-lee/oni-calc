import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ResourceChips from './ResourceChips';
import Number from './Number';

const styles = theme => ({
  root: {

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

export class BuildingDetails extends React.Component {
  render() {
    const { classes } = this.props;
    const { category, name, power, capacity, inputs, outputs } = this.props.building;
    const imgUrl = '/images/buildings/' +
      name.toLowerCase().split(' ').join('-') + '.png';
    const categoryImgUrl = '/images/building-categories/' +
      category.toLowerCase().split(' ').join('-') + '.png';
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${imgUrl})` }} />
          <div className={classes.headingContent}>
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
        <div className={classes.content}>
          <Typography variant="body1" className={classes.title}>
            <small>Power </small>
          </Typography>
          <Number value={(power.generation || 0) - (power.usage || 0)}
            suffix={`${power.unit || ''} (+${power.generation || 0}/-${power.usage || 0})`} />
          {capacity.power.unit === undefined ? '' :
            <Typography variant="body1" className={classes.dialogTitle}>
              <small>Power Capacity </small><br />
              {capacity.power.value + ' ' + capacity.power.unit}
            </Typography>
          }
          {capacity.resources.unit === undefined ? '' :
            <Typography variant="body1" className={classes.title}>
              <small>Resource Capacity </small><br />
              {capacity.resources.value + ' ' + capacity.resources.unit}
            </Typography>
          }
          <Typography variant="subheading" className={classes.title}>
            Inputs
          </Typography>
          <ResourceChips ios={inputs} type="Inputs" />
          <Typography variant="subheading" className={classes.title}>
            Outputs
          </Typography>
          <ResourceChips ios={outputs} type="Outputs" />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BuildingDetails);