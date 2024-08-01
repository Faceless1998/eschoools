import { createTheme } from '@mui/material'

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: { fontWeight: 'bold', pt: 1.4 },
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 'bold',
          textTransform: 'none',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiCssBaseline: {
      styleOverrides: { fontFamily: 'geoFONT, sans-serif' },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        button: {
          font: 'inherit',
          lineHeight: 'inherit',
          verticalAlign: 'inherit',
        },
        root: {
          '&[disabled]': {
            '&:hover': {
              textDecoration: 'none',
            },
            color: 'inherit',
            cursor: 'inherit',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#fafafa',
    },
    error: {
      main: '#AB221D',
    },
    info: {
      main: '#397874',
    },
    primary: {
      main: '#2e0b80',
    },
    success: {
      contrastText: 'rgb(255,255,255)',
      main: 'rgb(40, 167, 69)',
    },
    text: {
      primary: 'rgb(74,74,74)',
    },
  },
  typography: {
    fontFamily: 'geoFONT, sans-serif',
  },
})
