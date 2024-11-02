const tintColorLightGreen = '#069E6C';
const tintColorLighterGreen = '#95FA75';
const tintColorDarkGreen = '#374B30';
const tintColorDarkerGreen = '#1D2C27';
const ColorDark = '#1E1E1E';
const ColorLight = '#FFFFFF';

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
    tintDarkGreen: tintColorDarkGreen,
    tintDarkerGreen: tintColorDarkerGreen,
    tintLightGreen: tintColorLightGreen,
    tintLighterGreen: tintColorLighterGreen,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDarkGreen,
  },
};
