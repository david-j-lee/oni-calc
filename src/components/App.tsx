import { useContext } from '../context/useContext';
import About from './About';
import Calculator from './Calculator';
import PageNotFound from './PageNotFound';
import Buildings from './buildings/Buildings';
import Critters from './critters/Critters';
import Dupes from './dupes/Dupes';
import Geysers from './geysers/Geysers';
import Plants from './plants/Plants';
import Settings from './settings/Settings';
import Navbar from './ui/Navbar';
import '@fontsource/comfortaa/300.css';
import '@fontsource/comfortaa/400.css';
import '@fontsource/comfortaa/500.css';
import '@fontsource/comfortaa/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, css } from '@mui/material/styles';
import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: FC = () => {
  const [state, { getTheme }] = useContext();
  const { theme } = state;

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const muiTheme = createTheme({
    ...theme,
    typography: {
      fontFamily: ['"Comfortaa Variable"', 'sans-serif'].join(', '),
    },
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
            <Route path="critters" element={<Critters />} />
            <Route path="plants" element={<Plants />} />
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
