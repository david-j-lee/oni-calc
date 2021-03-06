import React, { FC, memo, useRef } from 'react';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import IFood from './../../interfaces/IFood';

// components
import ResourceChips from '../resources/ResourceChips';

interface IProps {
  item: IFood;
}

export const FoodItemDetail: FC<IProps> = memo(({ item }) => {
  const classes = useStyles();

  const imgUrl = useRef(
    `/images/resources/${item.name.toLowerCase().split(' ').join('-')}.png`,
  );

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <div
          className={classes.image}
          style={{
            background: `#3E4357 url(${imgUrl.current}) no-repeat center center`,
            backgroundSize: 'contain',
          }}
        />
        <div className={classes.headingContent}>
          <Typography variant="h6">{item.name}</Typography>
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
        <Typography variant="subtitle1" className={classes.title}>
          Requirements
        </Typography>
        {item.requirements.length === 0 ? (
          <Typography>No requirements found</Typography>
        ) : (
          item.requirements.map((requirement, i) => {
            const reqImgUrl = `/images/bio/${requirement.name
              .toLowerCase()
              .split(' ')
              .join('-')}.png`;

            return (
              <Chip
                key={i}
                label={requirement.name}
                avatar={
                  <Avatar>
                    <div
                      className={classes.avatar}
                      style={{ backgroundImage: `url(${reqImgUrl})` }}
                    />
                  </Avatar>
                }
              />
            );
          })
        )}
        <Typography variant="subtitle1" className={classes.title}>
          Inputs
        </Typography>
        <ResourceChips ios={item.inputs} />
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default FoodItemDetail;
