import { FC, memo, useRef, useState } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface IProps {
  prop: {
    name:
      | 'pollutedWaterValue'
      | 'pollutedDirtValue'
      | 'waterValue'
      | 'dirtValue';
    title: string;
    value: number;
  };
}

export const DupesWasteInput: FC<IProps> = memo(({ prop }) => {
  const [, { setDupeWaste }] = useContext();

  const [value, setValue] = useState(prop.value);

  const timer = useRef<number | null>(null);

  const imgUrl = useRef(
    '/images/resources/' +
      prop.title.toLowerCase().split(' ').join('-') +
      '.png',
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setValue(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDupeWaste(prop.name, Math.round(value));
    }, 500);
  };

  return (
    <Grid css={gridContainerCss} container spacing={1} alignItems="center">
      <Grid item>
        <div
          css={imageCss}
          style={{ backgroundImage: `url(${imgUrl.current})` }}
        />
      </Grid>
      <Grid item css={gridItemCss}>
        <TextField
          type="number"
          label={prop.title}
          inputProps={{
            style: { textAlign: 'right' },
            'aria-label': 'Dupe Waste Value',
          }}
          value={value}
          onChange={handleChange}
          helperText="g/cycle/dupe"
          margin="none"
          fullWidth
        />
      </Grid>
    </Grid>
  );
});

const gridContainerCss = css({
  flexWrap: 'nowrap',
});

const gridItemCss = css({
  width: '100%',
});

const imageCss = (theme: Theme) =>
  css({
    height: 20,
    width: 20,
    backgroundSize: 'cover',
    marginRight: theme.spacing(),
    marginTop: 5,
  });

export default DupesWasteInput;
