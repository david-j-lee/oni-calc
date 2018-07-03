import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// react-redux
import { connect } from 'react-redux';
import { getTheme } from '../actions/calculatorActions';

// material
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";

// components
import About from './About';
import Calculator from './Calculator';
import Navbar from '../components/Navbar';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

export class Root extends React.Component {
  componentWillMount() {
    this.props.getTheme();
  }

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      ...this.props.theme,
      typography: { fontFamily: ['"Nova Square"', 'sans-serif'].join(', ') }
    });

    return (
      <MuiThemeProvider theme={theme}>
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
}

const mapStateToProps = state => {
  return {
    theme: state.calculator.theme
  }
}

const mapDispatchToProps = {
  getTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Root));
