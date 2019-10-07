import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useContext } from '../context';

// material
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// components
import About from './About';
import Calculator from './Calculator';
import Navbar from '../components/ui/Navbar';

export default function Root() {
  const classes = useStyles();
  const [{ theme }, { getTheme }] = useContext();

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const muiTheme = createMuiTheme({
    ...theme,
    typography: { fontFamily: ['"Nova Square"', 'sans-serif'].join(', ') },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Calculator} />
            <Route exact path="/about" component={About} />
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));
