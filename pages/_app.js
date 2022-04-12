import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
