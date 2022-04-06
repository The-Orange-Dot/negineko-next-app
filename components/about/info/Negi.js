import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";

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
          Negi is the host and face of the stream, born in Tokyo, she moved to
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
          />
        </div>
        <div className={`${styles.layeredImage} negi-pic-anim2`}>
          <Image
            src={images[1]}
            alt="test"
            width={800}
            height={640}
            priority={true}
          />
        </div>
        <div className={`${styles.layeredImage} negi-pic-anim3`}>
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

export default Negi;
