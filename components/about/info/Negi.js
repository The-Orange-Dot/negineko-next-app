import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";

const Negi = () => {
  const images = ["/images/negi.png", "/images/negi2.png", "/images/negi3.png"];

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(".negi-text-anim", { opacity: 0, x: -30 }, { opacity: 1, x: 0 })
      .fromTo(
        ".negi-pic-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.3
      )
      .fromTo(
        ".negi-pic-anim2",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(".negi-pic-anim3", { opacity: 0, x: -30 }, { opacity: 1, x: 0 });

    tl.play(0);
  }, []);

  return (
    <>
      <div className={`${styles.infoContainer} negi-text-anim`}>
        <h1>Negi</h1>
        <p>
          Negi is the Host and face of the stream, born in Tokyo, she moved to
          Korea when she was 2 years old, and moved back to Tokyo when she was
          8. She speaks fluent English and Japanese, and knows just enough
          Korean to survive (maybe).
        </p>
        <ul>
          <li>Hobbies: Good food</li>
          <li>Favorite food: Negi (Leek)</li>
        </ul>
      </div>

      <div
        className={`${styles.layeredImage} negi-pic-anim`}
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
        rel="preload"
      >
        <div
          className={`${styles.layeredImage} negi-pic-anim2`}
          style={{
            opacity: 0,
            width: 800,
            height: 640,
            backgroundSize: "100%",
            backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[1]})`,
          }}
        >
          <div
            className={`${styles.layeredImage} negi-pic-anim3`}
            style={{
              opacity: 0,
              width: 800,
              height: 640,
              backgroundSize: "100%",
              backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[0]})`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Negi;
