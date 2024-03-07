import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Navbar from "./components/Navbar"
import theme from "../themes/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/Footer";
import { GlobalProvider } from "./context/GlobalProvider";


export const metadata: Metadata = {
  title: "RADIANT",
  description: "Radiant Skincare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <GlobalProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
