import { Components, createTheme as createMuiTheme, Palette, PaletteOptions, Shadows, Theme } from '@mui/material';
import { createPalette } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export function createTheme() {
  const palette: Palette = createPalette();
  const components: Components<Omit<Theme, 'components'>> = createComponents(palette);
  const shadows :Shadows = createShadows;
  const typography: TypographyOptions | ((palette: Palette) => TypographyOptions) = createTypography;
  
  return createMuiTheme({
    direction: 'rtl',
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}
