import React, { FC, memo, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IBuilding from '../../interfaces/IBuilding';

import ResourceChips from '../resources/ResourceChips';
import Number from '../common/Number';

interface IProps {
  building: IBuilding;
}

export const BuildingDetails: FC<IProps> = memo(({ building }) => {
  const classes = useStyles();
  const {
    category,
    categoryImgUrl,
    name,
    imgUrl,
    power,
    capacity,
    inputs,
    outputs,
  } = building;

  const [netPower, setNetPower] = useState(0);
  const [powerSuffix, setPowerSuffix] = useState<string | null>(null);

  useEffect(() => {
    setNetPower((power.generation || 0) - (power.usage || 0));
    setPowerSuffix(
      `${power.unit || ''} (+${power.generation || 0}/-${power.usage || 0})`,
    );
  }, [power.generation, power.unit, power.usage]);

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <div className={classes.imageWrapper}>
          <div
            className={classes.image}
            style={{
              background: `url(${imgUrl}) no-repeat center center`,
              backgroundSize: 'contain',
            }}
          />
        </div>
        <div className={classes.headingContent}>
          <Typography variant="h4" id="responsive-dialog-title">
            {name}
          </Typography>
          <div className={classes.category}>
            <div
              className={classes.categoryImage}
              style={{
                background: `url(${categoryImgUrl}) no-repeat center center`,
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
        <Number value={netPower} suffix={powerSuffix} />
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
            {capacity.resources.value.toLocaleString() +
              ' ' +
              capacity.resources.unit}
          </Typography>
        )}
        <Typography variant="subtitle1" className={classes.title}>
          Inputs
        </Typography>
        <ResourceChips ios={inputs} />
        <Typography variant="subtitle1" className={classes.title}>
          Outputs
        </Typography>
        <ResourceChips ios={outputs} />
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 400,
  },
  imageWrapper: {
    padding: theme.spacing(2),
    backgroundColor: '#3E4357',
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

export default BuildingDetails;
