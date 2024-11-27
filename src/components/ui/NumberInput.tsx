import { Add, Remove } from '@mui/icons-material';
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@mui/material';

type Props = {
  value: number;
  decrement: () => void;
  increment: () => void;
  label: string;
} & TextFieldProps;

export const NumberInput = ({
  label,
  value,
  onChange,
  decrement,
  increment,
  ...props
}: Props) => {
  return (
    <TextField
      type="number"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              color="secondary"
              aria-label="Decrement"
              onClick={decrement}
              edge="start"
            >
              <Remove />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="Increment"
              onClick={increment}
              edge="end"
            >
              <Add />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          'aria-label': label,
          ...(props?.InputProps?.inputProps ?? {}),
        },
      }}
      fullWidth
    >
      {value}
    </TextField>
  );
};

export default NumberInput;
