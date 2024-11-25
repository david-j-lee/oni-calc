import { useContext } from '../context/useContext';
import Capacity from './capacity/Capacity';
import Power from './power/Power';
import Resources from './resources/Resources';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Theme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const tabIndexMap = {
  '/': 0,
  '/dupes': 1,
  '/buildings': 2,
  '/plants': 3,
  '/critters': 4,
  '/geysers': 5,
};

export const Calculator = () => {
  const location = useLocation();
  const [, { getData }] = useContext();

  const [tabIndex, setTabIndex] = useState(
    tabIndexMap[location.pathname as keyof typeof tabIndexMap] ?? 0,
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, value: number) => {
      setTabIndex(value);
    },
    [],
  );

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
        <Capacity />
      </Grid>
      <Grid item sm={6} md={7} lg={8} css={rightSectionCss}>
        <Tabs
          css={tabsCss}
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
        >
          <Tab label="Settings" component={Link} to="/" />
          <Tab label="Dupes" component={Link} to="/dupes" />
          <Tab label="Buildings" component={Link} to="/buildings" />
          <Tab label="Plants" component={Link} to="/plants" />
          <Tab label="Critters" component={Link} to="/critters" />
          <Tab label="Geysers" component={Link} to="/geysers" />
        </Tabs>
        <div css={contentCss} className="styled-scrollbar">
          <Outlet />
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
      height: `calc(100vh - ${theme.spacing(8)})`,
      display: 'block',
      overflowY: 'auto',
      marginTop: theme.spacing(8),
    },
  });

const leftSectionCss = (theme: Theme) =>
  css({
    height: `calc(100% - ${theme.spacing(10)})`,
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
    height: `calc(100% - ${theme.spacing(10)})`,
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
