import { useContext } from '../../context/context';
import IGameModeValue from './../../interfaces/IGameModeValue';
import { css } from '@emotion/react';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC, useMemo } from 'react';

export const Settings: FC = () => {
  const [{ settings, dupes }, { setGameMode, toggleHideEmpty }] = useContext();

  const dupeFoodInput = useMemo(() => {
    if (dupes.inputs) {
      const foodInput = dupes.inputs.find((input) => input.name === 'Food');
      if (foodInput) {
        return foodInput.value as IGameModeValue;
      }
    }
    return null;
  }, [dupes.inputs]);

  return (
    <div css={rootCss}>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Card css={cardCss}>
            <ButtonBase css={buttonCss} onClick={() => setGameMode('survival')}>
              <CardContent>
                <Typography variant="h6" css={titleCss}>
                  {' '}
                  <Checkbox
                    checked={settings.gameMode === 'survival'}
                    onChange={() => setGameMode('survival')}
                    value="survival"
                    inputProps={{
                      'aria-label': 'game mode survival',
                    }}
                  />
                  <span>Survival</span>
                </Typography>
                <ul>
                  <li>
                    {dupeFoodInput ? dupeFoodInput.survival : ''} calories per
                    dupe every cycle
                  </li>
                </ul>
              </CardContent>
            </ButtonBase>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card css={cardCss}>
            <ButtonBase css={buttonCss} onClick={() => setGameMode('no-sweat')}>
              <CardContent>
                <Typography variant="h6" css={titleCss}>
                  <Checkbox
                    checked={settings.gameMode === 'no-sweat'}
                    onChange={() => setGameMode('no-sweat')}
                    value="no-sweat"
                    inputProps={{
                      'aria-label': 'game mode no sweat',
                    }}
                  />
                  <span>No Sweat</span>
                </Typography>
                <ul>
                  <li>
                    {dupeFoodInput ? dupeFoodInput.noSweat : ''} calories per
                    dupe every cycle
                  </li>
                </ul>
              </CardContent>
            </ButtonBase>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card css={cardCss}>
            <ButtonBase css={buttonCss} onClick={toggleHideEmpty}>
              <CardContent>
                <Typography variant="h6" css={titleCss}>
                  <Checkbox
                    checked={settings.hideEmpty}
                    onChange={toggleHideEmpty}
                    value="hide-empty"
                    inputProps={{
                      'aria-label': 'hide empty values from sidebar',
                    }}
                  />
                  <span>Hide empty values</span>
                </Typography>
                Hide unused resources and plants from the results sidebar
              </CardContent>
            </ButtonBase>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
  });

const cardCss = css({
  height: '100%',
});

const buttonCss = css({
  height: '100%',
  width: '100%',
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const titleCss = css({
  display: 'flex',
  alignItems: 'center',
});

export default Settings;
