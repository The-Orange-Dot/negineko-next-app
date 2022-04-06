import React, { useState, useEffect } from "react";
import styles from "../../../styles/about.module.css";
import { useMediaQuery } from "react-responsive";

const Events = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
  }, [isMobile]);

  return (
    <>
      <div className={mobile ? styles.mobileEvent : styles.event}>
        <h3>Charity Event - Canadian Red Cross</h3>
        <p>February 27, 2022 - March 6, 2022</p>
        <p>Ukrainain Humanitarian Crisis Appeal</p>
        <p>Raised CA$2,371 to provide humanitarian relief in Ukraine</p>
      </div>

      <div className={mobile ? styles.mobileEvent : styles.event}>
        <h3>Twitch Japan - Glitch EXP Event</h3>
        <p>March 25, 2022 - April 3, 2022</p>
        <p>Twitch 新生活応援祭2022</p>
        <p>Level 8 achieved</p>
      </div>
    </>
  );
};

export default Events;
