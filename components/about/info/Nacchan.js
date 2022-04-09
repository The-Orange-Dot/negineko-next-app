import React, { useEffect, useState } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Nacchan = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [tween, setTween] = useState(gsap.timeline({ paused: true }));
  const images = [
    "/images/nacchan1.png",
    "/images/nacchan2.png",
    "/images/nacchan3.png",
  ];

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);

    tween
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
  }, [isMobile, tween]);

  const loadAnimationHandler = () => {
    tween.play(0);
  };

  return (
    <>
      <div
        className={`${
          mobile ? styles.mobileInfoContainer : styles.infoContainer
        } nacchan-text-anim`}
      >
        {mobile ? null : <h1>Nacchan</h1>}
        <p>
          Mocchan&apos;s little sister; she is a Holland Lop with an endless
          amount of energy. She&apos;s curious and adventurous and nothing can
          hold her back from exploring new locations
        </p>
        <ul className={styles.infoList}>
          <li>Hobbies: Clothes, bothering Mocchan</li>
          <li>Favorite food: Pakuchi</li>
        </ul>
      </div>

      {mobile ? (
        <div
          className={`${styles.mobileInfoContainer} nacchan-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 400,
            height: 320,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} nacchan-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} nacchan-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} nacchan-pic-anim3`}>
            <Image
              src={images[0]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              onLoadingComplete={() => {
                loadAnimationHandler();
              }}
            />
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Nacchan;
