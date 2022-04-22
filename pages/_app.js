import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
