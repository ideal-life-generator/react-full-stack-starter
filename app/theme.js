import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, pinkA200, grey100, grey300, pink400, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

export const primary1Color = pink500;
export const primary2Color = pink700;
export const primary3Color = pink400;
export const accent1Color = pinkA200;
export const accent2Color = grey100;
export const accent3Color = grey500;
export const textColor = darkBlack;
export const alternateTextColor = white;
export const canvasColor = white;
export const borderColor = grey300;
export const disabledColor = fade(darkBlack, 0.3);
export const pickerHeaderColor = pink500;
export const clockCircleColor = fade(darkBlack, 0.07);
export const shadowColor = fullBlack;

export default function initTheme(userAgent) {
  return getMuiTheme({
    palette: {
      primary1Color,
      primary2Color,
      primary3Color,
      accent1Color,
      accent2Color,
      accent3Color,
      textColor,
      alternateTextColor,
      canvasColor,
      borderColor,
      disabledColor,
      pickerHeaderColor,
      clockCircleColor,
      shadowColor,
    },
  }, { userAgent });
}
