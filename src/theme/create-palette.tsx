import { common } from '@mui/material/colors';
import { alpha, Palette, PaletteOptions } from '@mui/material/styles';
import { error, indigo, info, neutral, success } from './colors';

export function createPalette(): Palette {
  const palette : PaletteOptions =  {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      hoverOpacity: 0.04,
      selected: alpha(neutral[900], 0.12),
      selectedOpacity: 0.12,
      disabledOpacity: 0.12,
      focusOpacity: 0.16,
      activatedOpacity: 1
    },
    background: {
      default: common.white,
      paper: common.white
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    grey: neutral,
    primary: indigo,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38)
    },
  };
  return palette as Palette;
}
