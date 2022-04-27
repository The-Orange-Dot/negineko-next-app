import React, { useEffect, useState } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Mocchan = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [tween, setTween] = useState(gsap.timeline({ paused: true }));
  const images = [
    "/images/mocchan1.png",
    "/images/mocchan2.png",
    "/images/mocchan3.png",
  ];
  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);

    tween
      .to(".loading-anim", { opacity: 0, duration: 0.2 })
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
  }, [isMobile, tween]);

  const loadAnimationHandler = () => {
    tween.play(0);
  };

  return (
    <>
      <div
        className={`${
          mobile ? styles.mobileInfoContainer : styles.infoContainer
        } mocchan-text-anim`}
      >
        {mobile ? null : <h1>Mocchan</h1>}
        <p>
          The official mascot of the NegiNeko_Tokyo channel. Mocchan is a
          Netherland Dwarf rabbit with perfect mascara. She does what she wants,
          wherever she wants, whenever she wants.
        </p>
        <ul className={styles.infoList}>
          <li>Hobbies: Binkies</li>
          <li>Favorite food: Pellets (Power of Timothy)</li>
        </ul>
      </div>
      <div>
        <h1 className={`${styles.loadingText} loading-anim`}>Loading...</h1>
      </div>

      {mobile ? (
        <div
          className={`${styles.mobileLayeredImageContainer} mocchan-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 400,
            height: 320,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} mocchan-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              priority={true}
            />
          </div>
          <div className={`${styles.layeredImage} mocchan-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              priority={true}
            />
          </div>
          <div className={`${styles.layeredImage} mocchan-pic-anim3`}>
            <Image
              src={images[0]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              priority={true}
              onLoadingComplete={() => {
                loadAnimationHandler();
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className={`${styles.layeredImageContainer} mocchan-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 800,
            height: 640,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} mocchan-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={800}
              height={640}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} mocchan-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={800}
              height={640}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} mocchan-pic-anim3`}>
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

export default Mocchan;
