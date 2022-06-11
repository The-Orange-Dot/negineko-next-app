import { createTheme } from "@mui/material/styles";

export const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#00b0ff",
      dark: "#53c4f7",
      light: "#1c7fac",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4fc3f7",
      dark: "#72cff8",
      light: "#3788ac",
      contrastText: "#ffffff",
    },
    delete: {
      main: "#ef5350",
      dark: "#f27573",
      light: "#a73a38",
      contrastText: "#ffffff",
    },
  },
});
