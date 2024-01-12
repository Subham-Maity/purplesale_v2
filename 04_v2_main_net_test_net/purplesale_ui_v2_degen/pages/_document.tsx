"use client";
import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
export default function Document() {
  const [mode, setMode] = React.useState(false);
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Html lang="en">
          <Head />
          <body className="dark:bg-[url('/Background.png')] bg-[#121416] bg-no-repeat bg-cover bg-fixed">
            <Main />
            <NextScript />
          </body>
        </Html>
      </ThemeProvider>
    </>
  );
}
