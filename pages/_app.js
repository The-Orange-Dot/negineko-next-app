import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <span className="contact-button">
        <Contact />
      </span>
    </>
  );
}

export default MyApp;
