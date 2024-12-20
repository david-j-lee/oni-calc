import { css, SerializedStyles } from '@emotion/react';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { FC, memo, useEffect, useState } from 'react';

interface IProps {
  value: number;
  suffix?: string | null;
  variant?: Variant | 'inherit';
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';
}

export const Number: FC<IProps> = memo(
  ({ value, suffix, variant, color }: IProps) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [sign, setSign] = useState('');
    const [signCss, setSignCss] = useState<SerializedStyles | ''>('');

    useEffect(() => {
      setDisplayValue(Math.round(Math.abs(value) * 100) / 100);
      setSign(value === 0 ? '' : value >= 0 ? '+' : '-');
      setSignCss(value === 0 ? '' : value >= 0 ? positiveCss : negativeCss);
    }, [value]);

    return (
      <Typography css={rootCss} variant={variant} color={color}>
        <span css={[signBaseCss, signCss]}>{sign}</span>{' '}
        {displayValue.toLocaleString()} {suffix}
      </Typography>
    );
  },
);

Number.displayName = 'Number';

const rootCss = css({
  whiteSpace: 'nowrap',
});

const signBaseCss = css({
  pointerEvents: 'none',
});

const positiveCss = css({
  color: 'green',
});

const negativeCss = css({
  color: 'red',
});

export default Number;
