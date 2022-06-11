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
      main: "#01579b",
      dark: "#3378af",
      light: "#003c6c",
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
