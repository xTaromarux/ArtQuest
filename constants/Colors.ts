const tintColorDarkGreen = '#374B30';
const tintColorDarkerGreen = '#1D2C27';
const ColorDark = '#1E1E1E';
const ColorLight = '#fff';

export default {
  light: {
    text: ColorLight,
    background: ColorLight,
    tint: ColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: ColorLight,
  },
  dark: {
    text: ColorDark,
    background: ColorDark,
    tint: tintColorDarkGreen,
    tintDark: tintColorDarkGreen,
    tintDarker: tintColorDarkerGreen,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDarkGreen,
  },
};
