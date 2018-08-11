import React from 'react';

// redux
import { connect } from 'react-redux';
import { setDupeWaste } from '../../actions/dupeActions';

// material
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {},
  gridContainer: {
    flexWrap: 'nowrap',
  },
  gridItem: {
    width: '100%',
  },
  image: {
    height: 20,
    width: 20,
    backgroundSize: 'cover',
    marginRight: theme.spacing.unit,
    marginTop: 5,
  },
});

export class DupesWasteInput extends React.Component {
  timer = 0;

  state = {
    value: this.props.prop.value,
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: value });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setDupeWaste(this.props.prop.name, Math.round(value));
    }, 500);
  };

  render() {
    const { classes, prop } = this.props;
    const { value } = this.state;

    const imgUrl =
      '/images/resources/' +
      prop.title
        .toLowerCase()
        .split(' ')
        .join('-') +
      '.png';

    return (
      <div className={classes.root}>
        <Grid
          className={classes.gridContainer}
          container
          spacing={8}
          alignItems="center"
        >
          <Grid item>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              type="number"
              label={prop.title}
              inputProps={{
                style: { textAlign: 'right' },
                'aria-label': 'Dupe Waste Value',
              }}
              value={value}
              onChange={this.handleChange}
              helperText="g/cycle/dupe"
              margin="none"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDupeWaste,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(DupesWasteInput));
