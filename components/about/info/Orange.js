import React from "react";
import styles from "../../../styles/about.module.css";
import { mouseIn, mouseOut } from "../PictureMouseAnimation";
const Orange = () => (
  <>
    <div className={styles.infoContainer}>
      <h1>Orange</h1>
      <p>
        The NegiNeko_Tokyo channel&apos;s admin, mod, and primary orange. He is
        responsible for managing the hardware, designing the software, and
        fixing anything Negi break.
      </p>
      <ul>
        <li>Hobbies: Good food</li>
        <li>Favorite food: Negi (Leek)</li>
      </ul>
    </div>
    <div
      className={styles.layeredImageOrange}
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

export default Orange;
