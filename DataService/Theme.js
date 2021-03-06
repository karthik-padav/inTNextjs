import { grey } from "@material-ui/core/colors";
export const darkMode = () => {
  return {
    palette: {
      secondary: {
        main: grey[800],
      },
      primary: {
        main: grey[800],
      },
      background: {
        paper: grey[800],
        dark: grey[900],
      },
    },
  };
};

export const redMode = () => {
  return {
    palette: {
      // secondary: {
      //   main: grey[800],
      // },
      primary: {
        main: "#8a0303",
      },
      // background: {
      //   paper: grey[800],
      //   dark: grey[900],
      // },
    },
  };
};
