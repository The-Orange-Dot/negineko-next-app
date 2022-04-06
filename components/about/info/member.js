import React, { useEffect } from "react";
import styles from "../../../styles/about.module.css";
import gsap from "gsap";
import Image from "next/image";

const Member = ({ member }) => {
  const images = [
    `/images/${member}.png`,
    `/images/${member}2.png`,
    `/images/${member}3.png`,
  ];

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        `.${member}-text-anim`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0 }
      )
      .fromTo(
        `.${member}-pic-anim`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.3
      )
      .fromTo(
        `.${member}-pic-anim2`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
      .fromTo(
        `.${member}-pic-anim3`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0 }
      );

    tl.play(0);
  }, []);

  return (
    <>
      <div className={`${styles.infoContainer} ${member}-text-anim`}>
        <h1>{member.slice(0, 1).toUpperCase() + member.slice(1)}</h1>
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
        className={`${styles.layeredImageContainer} ${member}-pic-anim`}
        style={{
          position: "relative",
          left: 0,
          opacity: 0,
          width: 800,
          height: 640,
        }}
        rel="preload"
      >
        <div className={`${styles.layeredImage} ${member}-pic-anim`}>
          <Image src={images[2]} alt="test" width={800} height={640} priority />
        </div>
        <div className={`${styles.layeredImage} ${member}-pic-anim2`}>
          <Image src={images[1]} alt="test" width={800} height={640} priority />
        </div>
        <div className={`${styles.layeredImage} ${member}-pic-anim3`}>
          <Image src={images[0]} alt="test" width={800} height={640} priority />
        </div>
      </div>
    </>
  );
};

export default Member;
