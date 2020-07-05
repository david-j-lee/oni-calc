import React, { FC, memo, useRef, useState } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

interface IProps {
  prop: any;
}

export const DupesWasteInput: FC<IProps> = memo(({ prop }) => {
  const classes = useStyles();

  const [, { setDupeWaste }] = useContext();

  const [value, setValue] = useState(prop.value);

  const timer = useRef<any>(null);

  const imgUrl = useRef(
    '/images/resources/' +
      prop.title.toLowerCase().split(' ').join('-') +
      '.png',
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDupeWaste(prop.name, Math.round(value));
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.gridContainer}
        container
        spacing={1}
        alignItems="center"
      >
        <Grid item>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${imgUrl.current})` }}
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <TextField
            type="number"
            label={prop.title}
            inputProps={{
              style: { textAlign: 'right' },
              'aria-label': 'Dupe Waste Value',
            }}
            value={value}
            onChange={handleChange}
            helperText="g/cycle/dupe"
            margin="none"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  gridContainer: {
    flexWrap: 'nowrap',
  },
  gridItem: {
    width: '100%',
  },
  image: {
    height: 20,
    width: 20,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
    marginTop: 5,
  },
}));

export default DupesWasteInput;
