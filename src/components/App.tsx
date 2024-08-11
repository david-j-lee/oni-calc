import { FC, useEffect } from 'react';
import { useContext } from '../context/context';

// material
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Router from './Router';

export const App: FC = () => {
  const [state, { getTheme }] = useContext();
  const { theme } = state;

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const muiTheme = createTheme({
    ...theme,
    typography: { fontFamily: ['"Nova Square"', 'sans-serif'].join(', ') },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
