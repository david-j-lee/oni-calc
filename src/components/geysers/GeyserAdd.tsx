import { useContext } from '../../context/useContext';
import IGeyser, {
  IGeyserMaxPressure,
  IGeyserTemp,
} from '../../interfaces/IGeyser';
import DetailsSection from '../ui/DetailsSection';
import IGeyserInput from './../../interfaces/IGeyserInput';
import GeyserOptions from './GeyserOptions';
import { css } from '@emotion/react';
import { Add, Clear } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';
import { FC, useCallback, useState } from 'react';

const defaultGeyser = {
  name: '',
  amount: 0,
  activeDuration: 0,
  activeEvery: 0,
  eruptionDuration: 0,
  eruptionEvery: 0,
  outputs: [],
};

export const GeyserAdd: FC = () => {
  const [{ geysers }, { addGeyser }] = useContext();

  const [geyser, setGeyser] = useState<
    IGeyserInput & { temp?: IGeyserTemp; maxPressure?: IGeyserMaxPressure }
  >({ ...defaultGeyser });
  const [isValid, setIsValid] = useState(false);

  const handleSelectChange = useCallback(
    (selectedGeyser: IGeyser) => {
      if (geysers && geysers.listing && selectedGeyser) {
        if (selectedGeyser?.name === geyser?.name) {
          setGeyser({ ...defaultGeyser });
        } else {
          setGeyser({
            ...selectedGeyser,
            amount: 0,
            eruptionDuration: 0,
            eruptionEvery: 0,
            activeDuration: 0,
            activeEvery: 0,
          });
        }
      }
    },
    [geysers, geyser?.name],
  );

  const handleTextFieldChange = useCallback(
    (
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
    },
    [geyser],
  );

  const clearInputs = useCallback(() => {
    setGeyser({
      ...geyser,
      amount: 0,
      eruptionDuration: 0,
      eruptionEvery: 0,
      activeDuration: 0,
      activeEvery: 0,
    });
    setIsValid(false);
  }, [geyser]);

  const handleAdd = useCallback(() => {
    addGeyser({
      ...geyser,
      amount: Number(geyser.amount),
      eruptionDuration: Number(geyser.eruptionDuration),
      eruptionEvery: Number(geyser.eruptionEvery),
      activeDuration: Number(geyser.activeDuration),
      activeEvery: Number(geyser.activeEvery),
    });
  }, [geyser, addGeyser]);

  return (
    <Card css={cardCss}>
      <CardContent css={cardContentCss}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GeyserOptions
              selectedGeyserName={geyser.name}
              select={handleSelectChange}
            />
          </Grid>
          {Boolean(geyser.name) && (
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Stack spacing={1}>
                <DetailsSection title="Temperature" noMargins>
                  {geyser.temp?.value} {geyser.temp?.unit}
                </DetailsSection>
                <DetailsSection title="Max Pressure" noMargins>
                  {geyser.maxPressure?.value} {geyser.maxPressure?.unit}
                </DetailsSection>
                <DetailsSection title="Outputs" noMargins>
                  {geyser.outputs.map((output, i: number) => {
                    const imageUrl =
                      '/images/resources/' +
                      output.name.toLowerCase().split(' ').join('-') +
                      '.png';

                    // TODO: Move into separate component so we can use useMemo
                    const resourceImgCss = css({
                      background: `url(${imageUrl}) no-repeat center center`,
                      backgroundSize: 'contain',
                    });

                    return (
                      <Chip
                        key={i}
                        avatar={
                          <Avatar>
                            <div css={[avatarCss, resourceImgCss]} />
                          </Avatar>
                        }
                        label={output.name}
                      />
                    );
                  })}
                </DetailsSection>
              </Stack>
            </Grid>
          )}
          {Boolean(geyser.name) && (
            <Grid item xs={12} sm={6} md={8} lg="auto">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" css={addTitleCss}>
                    Add a {geyser.name}
                  </Typography>
                  <Stack>
                    <div>
                      <TextField
                        value={geyser.amount}
                        css={textFieldCss}
                        margin="dense"
                        onChange={(e) => handleTextFieldChange(e, 'amount')}
                        label="Amount per eruption"
                        helperText="g/s"
                        type="number"
                        inputProps={{
                          'aria-label': 'Geyser Amount Per Eruption',
                        }}
                      />
                    </div>
                    <div>
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
                          'aria-label': 'Geyser Eruption Duration',
                        }}
                      />
                      <TextField
                        value={geyser.eruptionEvery}
                        css={textFieldCss}
                        margin="dense"
                        onChange={(e) =>
                          handleTextFieldChange(e, 'eruptionEvery')
                        }
                        label="Eruption every"
                        helperText="seconds"
                        type="number"
                        inputProps={{
                          'aria-label': 'Geyser Eruption Every',
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        value={geyser.activeDuration}
                        css={textFieldCss}
                        margin="dense"
                        onChange={(e) =>
                          handleTextFieldChange(e, 'activeDuration')
                        }
                        label="Active duration"
                        helperText="cycles"
                        type="number"
                        inputProps={{
                          'aria-label': 'Geyser Active Duration',
                        }}
                      />
                      <TextField
                        value={geyser.activeEvery}
                        css={textFieldCss}
                        margin="dense"
                        onChange={(e) =>
                          handleTextFieldChange(e, 'activeEvery')
                        }
                        label="Active every"
                        helperText="cycles"
                        type="number"
                        inputProps={{
                          'aria-label': 'Geyser Active Every',
                        }}
                      />
                    </div>
                  </Stack>
                </CardContent>
                <CardActions css={cardActionsCss}>
                  <Button onClick={clearInputs} color="secondary">
                    <Clear /> Clear
                  </Button>
                  {isValid && (
                    <Button variant="contained" onClick={handleAdd}>
                      <Add /> Add
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </CardContent>
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
});

const addTitleCss = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(2),
  });

const textFieldCss = (theme: Theme) =>
  css({
    paddingRight: theme.spacing(),
  });

export default GeyserAdd;
