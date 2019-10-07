import React from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';

// components
import DupeQuantity from './DupeQuantity';
import DupeTraits from './DupeTraits';
import DupesWaste from './DupesWaste';

export default function Dupes() {
  const classes = useStyles();
  const [{ dupes }] = useContext();

  return (
    <div className={classes.root}>
      <DupeQuantity />
      {dupes.quantity > 0 && <DupeTraits />}
      {dupes.quantity > 0 && <DupesWaste />}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
}));
