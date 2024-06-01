import {createTheme} from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#0fe987',
        dark: '#0ed67c',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF4081',
        dark: '#C60055',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F5F5F5',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#333333',
        secondary: '#4F4F4F',
        disabled: '#BDBDBD',
      },
      divider: '#E0E0E0',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#333333',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#333333',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#333333',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#333333',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#333333',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#333333',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        color: '#4F4F4F',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        color: '#4F4F4F',
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
  });

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#71F6BA',
        dark: '#57c090',
        contrastText: '#333333',
      },
      secondary: {
        main: '#FF4081',
        dark: '#C60055',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#001E2B',
        paper: '#00425E',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0BEC5',
        disabled: '#757575',
      },
      divider: '#37474F',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        color: '#B0BEC5',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        color: '#B0BEC5',
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 700,
        color: '#FFFFFF',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#001E2B',
          },
        },
      },
    },
  });