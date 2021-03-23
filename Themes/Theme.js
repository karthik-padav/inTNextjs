import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import colors from "./themeColors";

const defaultTheme = {
  typography: {
    fontFamily: "BrighterSansRegular",
    h1: {
      fontSize: 22,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 14,
    },
    h6: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
    },
  },
};

export const theme1 = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: colors.blue,
    },
    action: {
      // selected: colors.blue,
      hover: colors.hoverBlue,
    },
    text: {
      primary: colors.black,
      secondary: colors.black,
    },
    common: {
      color1: colors.blue,
      color2: colors.hoverBlue,
      color3: colors.white,
      color4: colors.black,
      color5: colors.red,
      color6: colors.hoverRed,
      color7: colors.lightGray,
    },
  },
});

export const theme2 = createMuiTheme({
  ...defaultTheme,
  palette: {
    type: "dark",
    primary: {
      main: colors.blue,
    },
    background: {
      paper: "#18191a",
    },
    action: {
      // selected: colors.blue,
      hover: colors.hoverBlue,
    },
    text: {
      primary: colors.black,
      secondary: colors.black,
    },
    common: {
      color1: colors.blue,
      color2: colors.hoverBlue,
      color3: colors.white,
      color4: colors.black,
      color5: colors.red,
      color6: colors.hoverRed,
      color7: colors.lightGray,
    },
  },
});
