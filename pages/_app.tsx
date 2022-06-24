import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { persistStore } from "redux-persist";
import store from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "../components/MuiColorThemes";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={colorTheme}>
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
