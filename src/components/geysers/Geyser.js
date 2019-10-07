import React from 'react';
import { useContext } from '../../context';

// material
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

export default function Geyser({ geyser }) {
  const classes = useStyles();
  const [, { deleteGeyser }] = useContext();

  const handleDelete = () => {
    deleteGeyser(geyser);
  };

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
            Active for {geyser.activeDuration} cycles every {geyser.activeEvery}{' '}
            cycles
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color="primary" onClick={handleDelete}>
            DELETE
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  chip: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  avatar: {
    height: '75%',
    width: '75%',
  },
}));
