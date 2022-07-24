import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Head from "next/head";
import "../styles/globals.css";
import { defaultTheme } from "../themes/main";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
