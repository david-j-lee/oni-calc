import React from 'react';

// redux
import { connect } from 'react-redux';
import { deleteGeyser } from '../../actions/geyserActions';

// material
import { withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {},
  cardActions: {
    justifyContent: 'flex-end',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

export class Geyser extends React.Component {
  handleDelete = () => {
    this.props.deleteGeyser(this.props.geyser);
  };

  render() {
    const { classes, geyser } = this.props;

    const output =
      geyser.outputs.map(output => output.name).join(', ') +
      ' ' +
      geyser.amount +
      ' ' +
      'g/s';

    return (
      <Card>
        <CardContent>
          <Typography variant="subheading">{geyser.name}</Typography>
          <Chip className={classes.chip} label={output} />
          <Typography>
            Eruption for {geyser.eruptionDuration} seconds every{' '}
            {geyser.eruptionEvery} seconds
          </Typography>
          <Typography>
            Active for {geyser.activeDuration} cycles every {geyser.activeEvery}{' '}
            cycles
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color="primary" onClick={this.handleDelete}>
            DELETE
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  deleteGeyser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Geyser));
