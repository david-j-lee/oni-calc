export default interface IThemeSaved {
  palette: {
    mode: 'light' | 'dark';
    primary: { [key: number]: string };
    secondary: { [key: number]: string };
    error: { [key: number]: string };
    contrastThreshold: number;
  };
}
