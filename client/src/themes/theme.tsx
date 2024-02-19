
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
});

export default theme;