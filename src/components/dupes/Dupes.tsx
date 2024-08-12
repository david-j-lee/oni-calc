import { useContext } from '../../context/context';
import DupeQuantity from './DupeQuantity';
import DupeTraits from './DupeTraits';
import DupesWaste from './DupesWaste';
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

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
