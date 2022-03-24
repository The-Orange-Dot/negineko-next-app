import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navBarPageContainer}>
      <div className={styles.navBarContainer}>
        <div className={styles.logo}>
          <Link href="/" passHref={true}>
            <h3>NegiNeko_Tokyo</h3>
          </Link>
        </div>
        <div className={styles.pageSelector}>
          <h4>
            <Link href="/"> Home </Link>
          </h4>
          <h4>
            <Link href="/about"> About </Link>
          </h4>
          <h4>
            <Link href="/travel"> Travel-Log </Link>
          </h4>
          {/* <h4>
            <Link href="/merch"> Merch </Link>
          </h4> */}
          <h4>
            <Link href="/multiView"> Multi-view </Link>
          </h4>
        </div>
        <div className={styles.signInButton}>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
