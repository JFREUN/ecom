import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"
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
          <Navbar />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
