import { useContext } from '../../context/useContext';
import IGeyser from '../../interfaces/IGeyser';
import { Close, Search } from '@mui/icons-material';
import {
  ButtonBase,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Theme,
  Typography,
  css,
} from '@mui/material';
import { Fragment, useCallback, useMemo, useState } from 'react';

type Props = {
  selectedGeyserName: string;
  select: (geyser: IGeyser) => void;
};

export const GeyserOptions = ({ selectedGeyserName, select }: Props) => {
  const [{ geysers }] = useContext();
  const [searchValue, setSearchValue] = useState('');

  const filteredGeysers = useMemo(
    () =>
      geysers.listing
        .filter(
          (geyser) =>
            !searchValue ||
            geyser.name.toUpperCase().includes(searchValue.toUpperCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [geysers, searchValue],
  );

  const clearSearchInput = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  return (
    <Fragment>
      <div css={searchCss}>
        <TextField
          placeholder="Search geysers by name"
          value={searchValue}
          onChange={handleSearchInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton onClick={clearSearchInput} size="small">
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
      </div>
      <div css={rootCss} className="styled-scrollbar">
        <Stack direction="row" spacing={1}>
          {filteredGeysers.map((geyser) => {
            // TODO: Move into a component so we can use useMemo
            const backgroundImgCss = css({
              background: `url(/images/geysers/${geyser.name.toLowerCase().replaceAll(/[ ']/g, '-')}.webp) no-repeat center center`,
              backgroundSize: 'contain',
            });

            return (
              <Card key={geyser.name} css={optionCss} variant="outlined">
                <ButtonBase
                  onClick={() => select(geyser)}
                  css={[
                    buttonCss,
                    selectedGeyserName === geyser.name
                      ? selectedOptionCss
                      : undefined,
                  ]}
                >
                  <div css={imgWrapperCss}>
                    <div css={[imgCss, backgroundImgCss]} title={geyser.name} />
                  </div>
                  <CardContent>
                    <Typography variant="h5">{geyser.name}</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            );
          })}
        </Stack>
      </div>
    </Fragment>
  );
};

const rootCss = (theme: Theme) =>
  css({
    overflow: 'auto',
    paddingBottom: theme.spacing(),
  });

const searchCss = (theme: Theme) =>
  css({
    padding: theme.spacing(1, 0, 2, 0),
    maxWidth: 400,
  });

const optionCss = css({
  width: 250,
  flexShrink: 0,
});

const selectedOptionCss = (theme: Theme) =>
  css({
    color: theme.palette.primary.main,
  });

const buttonCss = css({
  height: '100%',
  width: '100%',
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
});

const imgWrapperCss = css({
  backgroundColor: '#3E4357',
  height: 200,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const imgCss = (theme: Theme) =>
  css({
    width: '80%',
    height: '100%',
    margin: theme.spacing(),
    pointerEvents: 'none',
    backgroundColor: '#3E4357',
    cursor: 'default',
  });

export default GeyserOptions;
