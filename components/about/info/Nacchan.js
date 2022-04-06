import React from "react";
import styles from "../../../styles/about.module.css";
import { mouseIn, mouseOut } from "../PictureMouseAnimation";
const Nacchan = () => (
  <>
    <div className={styles.infoContainer}>
      <h1>Nacchan</h1>
      <p></p>
      <ul>
        <li>Hobbies: Good food</li>
        <li>Favorite food: Negi (Leek)</li>
      </ul>
    </div>
    <div
      className={styles.layeredImageNacchan}
      style={{
        width: 800,
        height: 640,
        objectFit: "cover",
        backgroundSize: "100%",
        overflow: "hidden",
      }}
      onMouseEnter={() => {
        mouseIn("negi");
      }}
      onMouseLeave={() => {
        mouseOut("negi");
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        {/* <Image
    src="/images/test.png"
    alt="negi"
    width={1000}
    height={563}
    className={styles.teamPhoto}
    id="negi"
    priority
  ></Image> */}
      </div>
    </div>
  </>
);

export default Nacchan;
