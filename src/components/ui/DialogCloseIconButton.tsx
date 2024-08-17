import { Close } from '@mui/icons-material';
import { IconButton, Theme, css } from '@mui/material';

type Prop = {
  close: () => void;
};

export const DialogCloseIconButton = ({ close }: Prop) => {
  return (
    <IconButton onClick={close} css={buttonCss}>
      <Close />
    </IconButton>
  );
};

const buttonCss = (theme: Theme) =>
  css({
    position: 'absolute',
    top: theme.spacing(),
    right: theme.spacing(),
  });

export default DialogCloseIconButton;
