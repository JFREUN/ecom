
'use client';
import { Raleway } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const raleway = Raleway({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#9370DB',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#E6E6FA',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: '#cccccc',
    },
  },
});

export default theme;