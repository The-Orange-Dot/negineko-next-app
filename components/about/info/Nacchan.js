import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
const Nacchan = () => {
  const images = [
    "/images/nacchan1.png",
    "/images/nacchan2.png",
    "/images/nacchan3.png",
  ];

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        ".nacchan-text-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0 }
      )
      .fromTo(
        ".nacchan-pic-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.3
      )
      .fromTo(
        ".nacchan-pic-anim2",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(
        ".nacchan-pic-anim3",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      );

    tl.play(0);
  }, []);

  return (
    <>
      <div className={`${styles.infoContainer} nacchan-text-anim`}>
        <h1>Nacchan</h1>
        <p>
          Mocchan&apos;s little sister; she is a Hollad Lop with an endless
          amount of energy. She&apos;s curious and adventurous and nothing can
          hold her back from exploring new locations
        </p>
        <ul>
          <li>Hobbies: Clothes, bothering Mocchan</li>
          <li>Favorite food: Pakuchi</li>
        </ul>
      </div>

      <div
        className={`${styles.layeredImage} nacchan-pic-anim`}
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
          className={`${styles.layeredImage} nacchan-pic-anim2`}
          style={{
            opacity: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundSize: "100%",
            overflow: "hidden",
            backgroundImage: `linear-gradient(to left, transparent 80%, white), url(${images[1]})`,
          }}
        >
          <div
            className={`${styles.layeredImage} nacchan-pic-anim3`}
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

export default Nacchan;
