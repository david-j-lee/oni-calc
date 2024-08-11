import { FC } from 'react';
import { useContext } from '../../context/context';

// material
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

// components
import DupeQuantity from './DupeQuantity';
import DupeTraits from './DupeTraits';
import DupesWaste from './DupesWaste';

export const Dupes: FC = () => {
  const [{ dupes }] = useContext();

  return (
    <div css={rootCss}>
      <DupeQuantity />
      {dupes.quantity > 0 && <DupeTraits />}
      {dupes.quantity > 0 && <DupesWaste />}
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  });

export default Dupes;
