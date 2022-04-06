import React, { useEffect, useState } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Orange = () => {
  const [tween, setTween] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const images = [
    "/images/orange1.png",
    "/images/orange2.png",
    "/images/orange3.png",
  ];

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
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

    setTween(tl);
  }, [isMobile]);

  return (
    <>
      <div
        className={`${
          mobile ? styles.mobileInfoContainer : styles.infoContainer
        } orange-text-anim`}
      >
        {mobile ? null : <h1>Orange</h1>}
        <p>
          The NegiNeko_Tokyo channel&apos;s admin, mod, and primary orange. He
          is responsible for managing the hardware and software, carrying the
          camera rig, and fixing anything Negi break.
        </p>
        <ul className={styles.infoList}>
          <li>Hobbies: Tech</li>
          <li>Favorite food: Food</li>
        </ul>
      </div>

      {mobile ? (
        <div
          className={`${styles.mobileInfoContainer} orange-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 400,
            height: 320,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} orange-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={400}
              height={320}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} orange-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={400}
              height={320}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} orange-pic-anim3`}>
            <Image
              src={images[0]}
              alt="test"
              width={400}
              height={320}
              priority={true}
              placeholder="empty"
              onLoadingComplete={() => {
                tween.play(0);
              }}
            />
          </div>
        </div>
      ) : (
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
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} orange-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={800}
              height={640}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} orange-pic-anim3`}>
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

export default Orange;
