import React from "react";
import styles from "../../../styles/about.module.css";
import { mouseIn, mouseOut } from "../PictureMouseAnimation";
import Image from "next/image";

const Negi = () => (
  <>
    <div className={styles.infoContainer}>
      <h1>Negi</h1>
      <p>
        Negi is the Host and face of the stream, born in Tokyo, she moved to
        Korea when she was 2 years old, and moved back to Tokyo when she was 8.
        She speaks fluent English and Japanese, and knows just enough Korean to
        survive (maybe).
      </p>
      <ul>
        <li>Hobbies: Good food</li>
        <li>Favorite food: Negi (Leek)</li>
      </ul>
    </div>
    <div
      className={styles.layeredImageNegi}
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
      <div>
        {/* <Image
          src="/images/test.png"
          alt="negi"
          width={800}
          height={640}
          className={styles.teamPhoto}
          id="negi"
          priority
        /> */}
      </div>
    </div>
  </>
);

export default Negi;
