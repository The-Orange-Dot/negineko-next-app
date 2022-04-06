import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";

const Mocchan = () => {
  const images = [
    "/images/mocchan1.png",
    "/images/mocchan2.png",
    "/images/mocchan3.png",
  ];
  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        ".mocchan-text-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0 }
      )
      .fromTo(
        ".mocchan-pic-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.3
      )
      .fromTo(
        ".mocchan-pic-anim2",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(
        ".mocchan-pic-anim3",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      );

    tl.play(0);
  }, []);

  return (
    <>
      <div className={`${styles.infoContainer} mocchan-text-anim`}>
        <h1>Mocchan</h1>
        <p></p>
        <ul>
          <li>Hobbies: Good food</li>
          <li>Favorite food: Negi (Leek)</li>
        </ul>
      </div>

      <div
        className={`${styles.layeredImage} mocchan-pic-anim`}
        style={{
          opacity: 0,
          width: 800,
          height: 640,
          objectFit: "cover",
          backgroundSize: "100%",
          overflow: "hidden",
          margin: "2% 0",
          backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[2]})`,
        }}
      >
        <div
          className={`${styles.layeredImage} mocchan-pic-anim2`}
          style={{
            opacity: 0,
            width: 800,
            height: 640,
            objectFit: "cover",
            backgroundSize: "100%",
            overflow: "hidden",
            backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[1]})`,
          }}
        >
          <div
            className={`${styles.layeredImage} mocchan-pic-anim3`}
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundSize: "100%",
              overflow: "hidden",
              backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[0]})`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Mocchan;
