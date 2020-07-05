import React, { FC, useEffect } from 'react';
import { useContext } from '../context';

// material
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Router from './Router';

export const App: FC = () => {
  const [state, { getTheme }] = useContext();
  const { theme } = state;

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
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
