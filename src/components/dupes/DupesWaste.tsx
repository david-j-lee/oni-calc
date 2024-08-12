import { useContext } from '../../context/context';
import { DUPES_WASTE_PROPS } from '../../utils/dupeUtils';
import DupesWasteInput from './DupesWasteInput';
import { css } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

export const DupesWaste: FC = () => {
  const [{ dupes }] = useContext();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography css={titleCss}>Waste</Typography>
      </Grid>
      {DUPES_WASTE_PROPS.map((prop, i) => {
        return (
          <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card css={cardCss}>
              <CardContent>
                <DupesWasteInput
                  prop={{
                    ...prop,
                    value: dupes[prop.name],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const titleCss = (theme: Theme) =>
  css({
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
  });

const cardCss = (theme: Theme) =>
  css({
    margin: theme.spacing(),
  });

export default DupesWaste;
