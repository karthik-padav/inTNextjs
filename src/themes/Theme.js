import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { grey, red, blue, lime, orange } from "@material-ui/core/colors";
import colors from "src/themes/themeColors";
import constants from "src/dataService/Constants";

export const defaultTheme = (theme) => {
  const isDark = theme === constants.THEME.DARK;
  return {
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
        fontSize: 14,
      },
      button: {
        fontSize: 11,
        letterSpacing: "1px",
      },
    },

    overrides: {
      MuiListItemIcon: {
        root: {
          minWidth: "auto",
          marginRight: "10px",
        },
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : grey[100],
          },
        },
      },
      MuiList: { padding: { paddingTop: 0, paddingBottom: 0 } },

      MuiPaper: {
        elevation1: {
          boxShadow:
            "0px 0px 2px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
      },

      MuiAppBar: {
        backgroundColor: grey[100],
      },

      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "0.4em",
            height: "0.4em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: blue[100],
            outline: "1px solid slategrey",
            borderRadius: "50px",
          },
        },
      },
    },
  };
};

export const getTheme = (theme) => {
  const isDark = theme === constants.THEME.DARK;
  return createMuiTheme({
    ...defaultTheme(theme),
    palette: {
      type: theme,
      action: {
        active: isDark ? "rgba(255, 255, 255, 0.7)" : colors.blue,
        hover: isDark ? "rgba(255, 255, 255, 0.08)" : grey[200],
        // selected: isDark ? "rgba(255, 255, 255, 0.7)" : grey[200],
        hoverOpacity: 0.1,
        selectedOpacity: 0.1,
      },
      text: {
        primary: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.87)",
      },
      background: {
        paper: isDark ? "#424242" : "#fff",
        body: isDark ? "#212121" : "#fff",
        default: isDark ? grey[800] : "#fff",
      },
      primary: {
        main: colors.blue,
      },
      secondary: {
        main: "#f44336",
      },
      common: {
        loader: orange[500],
        button: {
          bgColor: colors.blue,
          color: "#fff",
        },
        IconButton: {
          bgColor: `rgb(227 242 253 / ${isDark ? "10%" : "40%"})`,
          color: colors.blue,
        },
        tabs: {
          bgColor: isDark ? `rgb(227 242 253 / 10%)` : colors.blue,
          color: isDark ? colors.blue : "#fff",
        },
        blue: colors.blue,
        gray: grey[300],
        gray_100: grey[100],
        red_500: red[500],
      },
    },
  });
};

// export const theme1 = createMuiTheme({
//   ...defaultTheme,
//   palette: {
//     // type: "dark",
//     // primary: {
//     //   main: colors.blue,
//     // },

//     primary: {
//       // light: "#757ce8",
//       main: colors.blue,
//       // dark: "#002884",
//       // contrastText: "#fff",
//     },
//     secondary: {
//       // light: "#ff7961",
//       main: "#f44336",
//       // dark: "#ba000d",
//       // contrastText: "#000",
//     },

//     action: {
//       // selected: colors.blue,
//       // hover: colors.hoverBlue,
//     },
//     text: {
//       // primary: "rgba(255, 255, 255, 0.7)",
//       // secondary: "rgba(255, 255, 255, 0.7)",
//     },
//     common: {
//       color1: colors.blue,
//       color2: colors.hoverBlue,
//       color3: colors.white,
//       color4: colors.black,
//       color5: colors.red,
//       color6: colors.hoverRed,
//       color7: colors.lightGray,
//     },
//   },
// });

// export const theme2 = createMuiTheme({
//   ...defaultTheme,
//   palette: {
//     primary: {
//       main: colors.blue,
//     },
//     background: {
//       paper: "#18191a",
//     },
//     action: {
//       // selected: colors.blue,
//       hover: colors.hoverBlue,
//     },
//     text: {
//       primary: colors.black,
//       secondary: colors.black,
//     },
//     common: {
//       color1: colors.blue,
//       color2: colors.hoverBlue,
//       color3: colors.white,
//       color4: colors.black,
//       color5: colors.red,
//       color6: colors.hoverRed,
//       color7: colors.lightGray,
//     },
//   },
// });
