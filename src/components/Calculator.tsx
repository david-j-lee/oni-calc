import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useContext } from '../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import Power from './power/Power';
import Resources from './resources/Resources';
import Plants from './plants/Plants';
import Capacity from './capacity/Capacity';

import Dupes from './dupes/Dupes';
import Buildings from './buildings/Buildings';
import Food from './food/Food';
import Geysers from './geysers/Geysers';
import Settings from './settings/Settings';

export const Calculator = () => {
  const location = useLocation();
  const [, { getData }] = useContext();

  const [tabIndex, setTabIndex] = useState(
    location.pathname === '/settings'
      ? 0
      : location.pathname === '/dupes'
      ? 1
      : location.pathname === '/buildings'
      ? 2
      : location.pathname === '/food'
      ? 3
      : location.pathname === '/geysers'
      ? 4
      : 0,
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (_event: React.SyntheticEvent, value: number) => {
    setTabIndex(value);
  };

  return (
    <Grid container css={rootCss} className="styled-scrollbar">
      <Grid
        item
        sm={6}
        md={5}
        lg={4}
        css={leftSectionCss}
        className="styled-scrollbar"
      >
        <Power />
        <Resources />
        <Plants />
        <Capacity />
      </Grid>
      <Grid item sm={6} md={7} lg={8} css={rightSectionCss}>
        <Tabs
          css={tabsCss}
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
        >
          <Tab label="Settings" component={Link} to="/settings" />
          <Tab label="Dupes" component={Link} to="/dupes" />
          <Tab label="Buildings" component={Link} to="/buildings" />
          <Tab label="Food" component={Link} to="/food" />
          <Tab label="Geysers" component={Link} to="/geysers" />
        </Tabs>
        <div css={contentCss} className="styled-scrollbar">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/dupes" element={<Dupes />} />
            <Route path="/buildings" element={<Buildings />} />
            <Route path="/food" element={<Food />} />
            <Route path="/geysers" element={<Geysers />} />
          </Routes>
        </div>
      </Grid>
    </Grid>
  );
};

const rootCss = (theme: Theme) =>
  css({
    height: '100vh',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - ${theme.spacing(8)}px)`,
      display: 'block',
      overflowY: 'auto',
      marginTop: theme.spacing(8),
    },
  });

const leftSectionCss = (theme: Theme) =>
  css({
    height: `calc(100% - ${theme.spacing(10)}px)`,
    flexGrow: 1,
    overflowY: 'auto',
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      marginTop: 0,
    },
  });

const rightSectionCss = (theme: Theme) =>
  css({
    height: `calc(100% - ${theme.spacing(10)}px)`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      marginTop: theme.spacing(),
    },
  });

const tabsCss = (theme: Theme) =>
  css({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  });

const contentCss = (theme: Theme) =>
  css({
    padding: theme.spacing(1, 1, 0, 1),
    height: '100%',
    overflowY: 'auto',
  });

export default Calculator;
