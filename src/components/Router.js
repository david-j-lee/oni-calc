import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

// components
import About from './About';
import Calculator from './Calculator';
import Navbar from './ui/Navbar';

export default function Root() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Calculator} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));
