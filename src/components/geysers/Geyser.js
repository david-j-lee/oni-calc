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
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    height: '100%',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    height: '75%',
    width: '75%',
  },
});

export class Geyser extends React.Component {
  handleDelete = () => {
    this.props.deleteGeyser(this.props.geyser);
  };

  render() {
    const { classes, geyser } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="subheading">{geyser.name}</Typography>
            {geyser.outputs.length > 0 &&
              geyser.outputs.map((output, i) => {
                const imageUrl = `/images/resources/${output.name
                  .toLowerCase()
                  .split(' ')
                  .join('-')}.png`;

                return (
                  <Chip
                    key={i}
                    className={classes.chip}
                    label={[output.name, geyser.amount].join(' ') + ' g/s'}
                    avatar={
                      <Avatar>
                        <div
                          className={classes.avatar}
                          style={{
                            background: `url(${imageUrl}) no-repeat center center`,
                            backgroundSize: 'contain',
                          }}
                        />
                      </Avatar>
                    }
                  />
                );
              })}
            <Typography>
              Eruption for {geyser.eruptionDuration} seconds every{' '}
              {geyser.eruptionEvery} seconds
            </Typography>
            <Typography>
              Active for {geyser.activeDuration} cycles every{' '}
              {geyser.activeEvery} cycles
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button color="primary" onClick={this.handleDelete}>
              DELETE
            </Button>
          </CardActions>
        </Card>
      </div>
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
