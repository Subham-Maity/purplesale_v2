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
  const lock = true;
  const frontendResponse = "Loading...";
  return (
    <>
      <ThemeProvider theme={theme}>
        {lock ? (
          <Html lang="en">
            <Head />
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        ) : (
          frontendResponse
        )}
      </ThemeProvider>
    </>
  );
}
