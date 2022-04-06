import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";

const Orange = () => {
  const images = [
    "/images/orange1.png",
    "/images/orange2.png",
    "/images/orange3.png",
  ];

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(".orange-text-anim", { opacity: 0, x: -30 }, { opacity: 1, x: 0 })
      .fromTo(
        ".orange-pic-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.3
      )
      .fromTo(
        ".orange-pic-anim2",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(
        ".orange-pic-anim3",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      );

    tl.play(0);
  }, []);

  return (
    <>
      <div className={`${styles.infoContainer} orange-text-anim`}>
        <h1>Orange</h1>
        <p>
          The NegiNeko_Tokyo channel&apos;s admin, mod, and primary orange. He
          is responsible for managing the hardware, designing the software, and
          fixing anything Negi break.
        </p>
        <ul>
          <li>Hobbies: Tech</li>
          <li>Favorite food: Food</li>
        </ul>
      </div>

      <div
        className={`${styles.layeredImageContainer} orange-pic-anim`}
        style={{
          position: "relative",
          left: 0,
          opacity: 0,
          width: 800,
          height: 640,
        }}
        rel="preload"
      >
        <div className={`${styles.layeredImage} orange-pic-anim`}>
          <Image
            src={images[2]}
            alt="test"
            width={800}
            height={640}
            priority={true}
          />
        </div>
        <div className={`${styles.layeredImage} orange-pic-anim2`}>
          <Image
            src={images[1]}
            alt="test"
            width={800}
            height={640}
            priority={true}
          />
        </div>
        <div className={`${styles.layeredImage} orange-pic-anim3`}>
          <Image
            src={images[0]}
            alt="test"
            width={800}
            height={640}
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default Orange;
