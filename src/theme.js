
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E8A1B5",
      light: "#F8D7E3",
      dark: "#C77D98",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B9A5D6",
      light: "#EDE7F6",
      dark: "#9178B5",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFF8FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#594653",
      secondary: "#927D8C",
    },
    success: {
      main: "#91BFA6",
    },
  },

  typography: {
    fontFamily: '"Nunito", "Trebuchet MS", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFF8FA",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: "9px 20px",
          boxShadow: "none",
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
            filter: "brightness(0.97)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid #F5E5EC",
          boxShadow: "0 4px 15px rgba(190, 140, 165, 0.12)",
          overflow: "hidden",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
