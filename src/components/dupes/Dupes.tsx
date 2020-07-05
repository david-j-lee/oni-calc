import React, { FC } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// components
import DelayedLoader from '../common/DelayedLoader';
import DupeQuantity from './DupeQuantity';
import DupeTraits from './DupeTraits';
import DupesWaste from './DupesWaste';

export const Dupes: FC = () => {
  const classes = useStyles();
  const [{ dupes }] = useContext();

  return (
    <DelayedLoader>
      <div className={classes.root}>
        <DupeQuantity />
        {dupes.quantity > 0 && <DupeTraits />}
        {dupes.quantity > 0 && <DupesWaste />}
      </div>
    </DelayedLoader>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
}));

export default Dupes;
