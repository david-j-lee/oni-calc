import { useContext } from '../../context/useContext';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';

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

export const DupesWasteInput: FC<IProps> = memo(({ prop }: IProps) => {
  const [, { setDupeWaste }] = useContext();

  const [value, setValue] = useState(prop.value);

  const timer = useRef<number | null>(null);

  const backgroundImgCss = useMemo(() => {
    const imgUrl =
      '/images/resources/' +
      prop.title.toLowerCase().split(' ').join('-') +
      '.png';
    return css({
      background: `url(${imgUrl}) no-repeat center center`,
      backgroundSize: 'contain',
    });
  }, [prop.title]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setValue(value);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDupeWaste(prop.name, Math.round(value));
      }, 500);
    },
    [prop.name, setDupeWaste],
  );

  return (
    <Grid css={gridContainerCss} container spacing={1} alignItems="center">
      <Grid item>
        <div css={[imageCss, backgroundImgCss]} />
      </Grid>
      <Grid item css={gridItemCss}>
        <TextField
          type="number"
          label={prop.title}
          inputProps={{
            'aria-label': 'Dupe Waste Value',
          }}
          value={value}
          onChange={handleChange}
          helperText="g/cycle/dupe"
          fullWidth
        />
      </Grid>
    </Grid>
  );
});

DupesWasteInput.displayName = 'DupesWasteInput';

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
    marginRight: theme.spacing(),
  });

export default DupesWasteInput;
