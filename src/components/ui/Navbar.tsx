import NavbarBuildings from './NavbarBuildings';
import NavbarDupes from './NavbarDupes';
import NavbarGeysers from './NavbarGeysers';
import ThemePicker from './ThemePicker';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { css, Theme } from '@mui/material/styles';
import { FC, memo } from 'react';
import { Routes, Link, Route } from 'react-router-dom';

export const Navbar: FC = memo(() => {
  return (
    <div css={rootCss}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography css={titleCss} variant="h6" color="inherit">
            O<span css={oniColorCss}>N</span>I<span css={onicColorCss}>C</span>
          </Typography>
          <div css={flexCss}>
            <Tooltip title="Home">
              <IconButton
                component={Link}
                to="/"
                color="inherit"
                aria-label="Home"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="About">
              <IconButton
                component={Link}
                to="/about"
                color="inherit"
                aria-label="Help"
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div css={rightNavCss}>
            <Routes>
              <Route path="/geysers" element={<NavbarGeysers />} />
              <Route path="/buildings" element={<NavbarBuildings />} />
              <Route path="/dupes" element={<NavbarDupes />} />
              <Route path="*" element={null} />
            </Routes>
            <ThemePicker />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
});

const rootCss = css({
  flexGrow: 1,
});

const titleCss = (theme: Theme) =>
  css({
    marginRight: theme.spacing(),
    fontWeight: 'bold',
  });

const flexCss = css({
  flex: 1,
});

const rightNavCss = css({
  display: 'flex',
  flexWrap: 'wrap',
});

const oniColorCss = css({
  color: '#FD6B6B',
});

const onicColorCss = css({
  color: '#00E3E3',
});

export default Navbar;
