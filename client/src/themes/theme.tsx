
'use client';
import { Raleway } from 'next/font/google';
import { Theme, createTheme } from '@mui/material/styles';

const raleway = Raleway({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Potential Color Palette:

// Main - Purple: #9581EB;
// Lighter Purple: #CDBEF6;
// Lightest Purple: #F6EBFF;
// Ligher Green: #DCF0E2
// Main - Green: #68BAA5;
// Darker - Green: #4F8073;

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
  palette: {
    text: {
      primary: '#333333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
          {
            boxShadow: "none",
            backgroundColor: '#9581EB',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#7F6BC2',
            },
          }),
          ...(ownerState.variant === 'text' && {
            color: '#333333',
            transition: 'color 0.3s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#9581EB',
            },
          }),
          ...(ownerState.variant === 'outlined' &&
          {
            color: "#9581EB",
            backgroundColor: 'transparent',
            border: "1px #9581EB solid",
            '&:hover': {
              backgroundColor: 'rgba(147, 127, 235, 0.1);',
              border: "1px #9581EB solid",

            },
          }),
        }),

      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          '& .MuiButtonGroup-firstButton': {
            borderRightColor: '#9581EB',
          },
        },
      },
    },

  },
});

export default theme;