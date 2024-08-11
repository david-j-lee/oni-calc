import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// material
import { ThemeProvider, createTheme, css } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useContext } from '../context/context';
import PageNotFound from './PageNotFound';
import Navbar from './ui/Navbar';
import About from './About';
import Calculator from './Calculator';
import Dupes from './dupes/Dupes';
import Buildings from './buildings/Buildings';
import Food from './food/Food';
import Geysers from './geysers/Geysers';
import Settings from './settings/Settings';

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
      <div css={rootCss}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Calculator />}>
            <Route index element={<Settings />} />
            <Route path="dupes" element={<Dupes />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="food" element={<Food />} />
            <Route path="geysers" element={<Geysers />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

const rootCss = css({
  height: '100%',
});

export default App;
