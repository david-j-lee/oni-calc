import React, { useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import ResourceChips from '../resources/ResourceChips';
import Number from '../common/Number';

export default function BuildingDetails({
  category,
  name,
  power,
  capacity,
  inputs,
  outputs,
}) {
  const classes = useStyles();

  const netPower = useRef(power.generation || 0) - (power.usage || 0);
  const powerSuffix = useRef(
    `${power.unit || ''} (+${power.generation || 0}/-${power.usage || 0})`,
  );

  const imgUrl = useRef(
    `/images/buildings/${name
      .toLowerCase()
      .split(' ')
      .join('-')}.png`,
  );

  const categoryImgUrl = useRef(
    `/images/building-categories/${category
      .toLowerCase()
      .split(' ')
      .join('-')}.png`,
  );

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <div
          className={classes.image}
          style={{
            background: `#3E4357 url(${
              imgUrl.current
            }) no-repeat center center`,
            backgroundSize: 'contain',
          }}
        />
        <div className={classes.headingContent}>
          <Typography variant="display1" id="responsive-dialog-title">
            {name}
          </Typography>
          <div className={classes.category}>
            <div
              className={classes.categoryImage}
              style={{
                background: `url(${
                  categoryImgUrl.current
                }) no-repeat center center`,
                backgroundSize: 'contain',
              }}
            />
            <Typography className={classes.category}>{category}</Typography>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.title}>
          <small>Power</small>
        </Typography>
        <Number value={netPower.current} suffix={powerSuffix.current} />
        {capacity.power.unit !== undefined && (
          <Typography variant="body1" className={classes.title}>
            <small>Power Capacity</small>
            <br />
            {capacity.power.value + ' ' + capacity.power.unit}
          </Typography>
        )}
        {capacity.resources.unit !== undefined && (
          <Typography variant="body1" className={classes.title}>
            <small>Resource Capacity</small>
            <br />
            {capacity.resources.value + ' ' + capacity.resources.unit}
          </Typography>
        )}
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
  );
}

const useStyles = makeStyles(theme => ({
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
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: 0,
    width: 500 - 160,
    flexGrow: 1,
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.75),
  },
  categoryImage: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(),
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
}));
