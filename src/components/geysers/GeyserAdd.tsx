import { useContext } from '../../context/useContext';
import { IGeyserMaxPressure, IGeyserTemp } from '../../interfaces/IGeyser';
import IGeyserInput from './../../interfaces/IGeyserInput';
import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useState } from 'react';

const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
      transform: 'translate3d(0, 0, 0)', // issue with scrollbar not working on second attempt
    },
  },
};

export const GeyserAdd: FC = () => {
  const [{ geysers }, { addGeyser }] = useContext();

  const [geyserName, setGeyserName] = useState('');
  const [geyser, setGeyser] = useState<
    IGeyserInput & { temp?: IGeyserTemp; maxPressure?: IGeyserMaxPressure }
  >({
    name: '',
    amount: 0,
    activeDuration: 0,
    activeEvery: 0,
    eruptionDuration: 0,
    eruptionEvery: 0,
    outputs: [],
  });
  const [isValid, setIsValid] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    if (geysers && geysers.listing) {
      const geyser = geysers.listing.find((g) => g.name === event.target.value);
      if (geyser) {
        setGeyser({
          ...geyser,
          amount: 0,
          eruptionDuration: 0,
          eruptionEvery: 0,
          activeDuration: 0,
          activeEvery: 0,
        });
        // TODO: Confirm this is working correctly.
        setGeyserName(event.target.value);
      }
    }
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string,
  ) => {
    const newGeyser: IGeyserInput = {
      ...geyser,
      [prop]: event.target.value,
    } as IGeyserInput;
    setGeyser(newGeyser);
    if (
      newGeyser.amount &&
      newGeyser.eruptionDuration &&
      newGeyser.eruptionEvery &&
      newGeyser.activeDuration &&
      newGeyser.activeEvery
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const clearInputs = () => {
    setGeyser({
      ...geyser,
      amount: 0,
      eruptionDuration: 0,
      eruptionEvery: 0,
      activeDuration: 0,
      activeEvery: 0,
    });
    setIsValid(false);
  };

  const handleAdd = () => {
    addGeyser({
      ...geyser,
      amount: Number(geyser.amount),
      eruptionDuration: Number(geyser.eruptionDuration),
      eruptionEvery: Number(geyser.eruptionEvery),
      activeDuration: Number(geyser.activeDuration),
      activeEvery: Number(geyser.activeEvery),
    });
  };

  return (
    <Card css={cardCss}>
      <CardContent css={cardContentCss}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormControl css={geyserSelectCss}>
              <InputLabel htmlFor="geyser">Select a Geyser</InputLabel>
              <Select
                displayEmpty
                MenuProps={MENU_PROPS}
                value={geyserName}
                onChange={handleSelectChange}
                inputProps={{
                  name: 'geyserName',
                  id: 'geyserName',
                }}
              >
                {geysers.listing.map((g, i) => {
                  return (
                    <MenuItem key={i} value={g.name}>
                      {g.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {geyserName !== '' && (
              <Grid container css={geyserInfoCss}>
                <Grid item xs={12} md={6}>
                  <Typography css={titleCss}>
                    <small>Temperature</small>
                    <br />
                    {geyser.temp?.value} {geyser.temp?.unit}
                  </Typography>
                  <Typography css={titleCss}>
                    <small>Max Pressure</small>
                    <br />
                    {geyser.maxPressure?.value} {geyser.maxPressure?.unit}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography css={titleCss}>
                    <small>Outputs</small>
                  </Typography>
                  {geyser.outputs.map((output, i: number) => {
                    const imageUrl =
                      '/images/resources/' +
                      output.name.toLowerCase().split(' ').join('-') +
                      '.png';

                    return (
                      <Chip
                        key={i}
                        avatar={
                          <Avatar>
                            <div
                              css={avatarCss}
                              style={{ backgroundImage: `url(${imageUrl})` }}
                            />
                          </Avatar>
                        }
                        label={output.name}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            )}
          </Grid>
          {geyserName !== '' && (
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    value={geyser.amount}
                    css={textFieldCss}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'amount')}
                    label="Amount per eruption"
                    helperText="g/s"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Amount Per Eruption',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={geyser.eruptionDuration}
                    css={textFieldCss}
                    margin="dense"
                    onChange={(e) =>
                      handleTextFieldChange(e, 'eruptionDuration')
                    }
                    label="Eruption duration"
                    helperText="seconds"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Eruption Duration',
                    }}
                  />
                  <TextField
                    value={geyser.eruptionEvery}
                    css={textFieldCss}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'eruptionEvery')}
                    label="Eruption every"
                    helperText="seconds"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Eruption Every',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={geyser.activeDuration}
                    css={textFieldCss}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'activeDuration')}
                    label="Active duration"
                    helperText="cycles"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Active Duration',
                    }}
                  />
                  <TextField
                    value={geyser.activeEvery}
                    css={textFieldCss}
                    margin="dense"
                    onChange={(e) => handleTextFieldChange(e, 'activeEvery')}
                    label="Active every"
                    helperText="cycles"
                    type="number"
                    inputProps={{
                      style: { textAlign: 'right' },
                      'aria-label': 'Geyser Active Every',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
      {geyserName !== '' && (
        <CardActions css={cardActionsCss}>
          <Button onClick={clearInputs} color="secondary">
            Clear
          </Button>
          {isValid && (
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

const cardCss = (theme: Theme) =>
  css({
    margin: theme.spacing(),
  });

const cardContentCss = css({
  flex: '1 0 auto',
  display: 'flex',
});

const cardActionsCss = css({
  justifyContent: 'flex-end',
});

const avatarCss = css({
  height: '75%',
  width: '75%',
  backgroundSize: 'contain',
});

const geyserSelectCss = css({
  minWidth: 250,
});

const geyserInfoCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  });

const titleCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  });

const textFieldCss = (theme: Theme) =>
  css({
    paddingRight: theme.spacing(),
  });

export default GeyserAdd;
