import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, pinkA200, grey100, grey300, pink400, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

export default function initTheme(userAgent) {
  return getMuiTheme({
    palette: {
      primary1Color: pink500,
      primary2Color: pink700,
      primary3Color: pink400,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: pink500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }, { userAgent });
}
