import React, { useEffect, useState } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";

const Nacchan = () => {
  const [tween, setTween] = useState();
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
    setTween(tl);
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
        className={`${styles.layeredImageContainer} nacchan-pic-anim`}
        style={{
          position: "relative",
          left: 0,
          opacity: 0,
          width: 800,
          height: 640,
        }}
        rel="preload"
      >
        <div className={`${styles.layeredImage} nacchan-pic-anim`}>
          <Image
            src={images[2]}
            alt="test"
            width={800}
            height={640}
            priority={true}
            placeholder="empty"
          />
        </div>
        <div className={`${styles.layeredImage} nacchan-pic-anim2`}>
          <Image
            src={images[1]}
            alt="test"
            width={800}
            height={640}
            priority={true}
            placeholder="empty"
          />
        </div>
        <div className={`${styles.layeredImage} nacchan-pic-anim3`}>
          <Image
            src={images[0]}
            alt="test"
            width={800}
            height={640}
            priority={true}
            placeholder="empty"
            onLoadingComplete={() => {
              tween.play(0);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Nacchan;
