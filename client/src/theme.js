import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#edebeb", // Primary button background
      contrastText: "#3b3b3b", // Primary button text
    },
    secondary: {
      main: "#3b3b3b", // Secondary button background
      contrastText: "#edebeb", // Secondary button text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#3b3b3b",
          color: "#edebeb",
          "&:hover": {
            backgroundColor: "#484848",
          },
        },
        containedSecondary: {
          backgroundColor: "#8D0801",
          color: "#edebeb",
          "&:hover": {
            backgroundColor: "#A1100A",
          },
        },
      },
    },
  },
});

export default theme;
