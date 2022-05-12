import React, { useEffect, useState } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Negi = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [tween, setTween] = useState(gsap.timeline({ paused: true }));
  const images = ["/images/negi.png", "/images/negi2.png", "/images/negi3.png"];

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);

    tween
      .to(".loading-anim", { opacity: 0, duration: 0.2 })
      .fromTo(".negi-text-anim", { opacity: 0, x: -30 }, { opacity: 1, x: 0 })
      .fromTo(
        ".negi-pic-anim",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(
        ".negi-pic-anim2",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(".negi-pic-anim3", { opacity: 0, x: -30 }, { opacity: 1, x: 0 });
  }, [isMobile, tween]);

  const loadAnimationHandler = () => {
    tween.play(0);
  };

  return (
    <>
      <div
        className={`${
          mobile ? styles.mobileInfoContainer : styles.infoContainer
        } negi-text-anim`}
      >
        {mobile ? null : <h1>Negi</h1>}
        <p>
          Negi is the host and face of the stream; she was born in Tokyo but
          moved to Korea when she was 2 years old, and moved back to Tokyo when
          she was 8. She speaks fluent English and Japanese, and knows just
          enough Korean to survive (maybe).
        </p>
        <ul className={styles.infoList}>
          <li>Hobbies: Good food</li>
          <li>Favorite food: Negi (Leek)</li>
          <li>Nationality: Japanese</li>
        </ul>
      </div>
      <div>
        <h1
          className={`${
            mobile ? styles.mobileLoadingText : styles.loadingText
          } loading-anim`}
        >
          Loading...
        </h1>
      </div>

      {mobile ? (
        <div
          className={`${styles.mobileInfoContainer} negi-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 400,
            height: 320,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} negi-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              priority={true}
            />
          </div>
          <div className={`${styles.layeredImage} negi-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={400}
              height={320}
              placeholder="empty"
              priority={true}
            />
          </div>
          <div className={`${styles.layeredImage} negi-pic-anim3`}>
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
          className={`${styles.layeredImageContainer} negi-pic-anim`}
          style={{
            position: "relative",
            left: 0,
            opacity: 0,
            width: 800,
            height: 640,
          }}
          rel="preload"
        >
          <div className={`${styles.layeredImage} negi-pic-anim`}>
            <Image
              src={images[2]}
              alt="test"
              width={800}
              height={640}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} negi-pic-anim2`}>
            <Image
              src={images[1]}
              alt="test"
              width={800}
              height={640}
              priority={true}
              placeholder="empty"
            />
          </div>
          <div className={`${styles.layeredImage} negi-pic-anim3`}>
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

export default Negi;
