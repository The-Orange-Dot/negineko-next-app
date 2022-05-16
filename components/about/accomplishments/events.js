import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/about.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const Events = () => {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const cardRef1 = useRef();
  const cardRef2 = useRef();

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);

    //EXAMPLE!!!!!
    // let tl = gsap.timeline({
    //   paused: true,
    //   // yes, we can add it to an entire timeline!
    //   scrollTrigger: {
    //     trigger: ".card",
    //     markers: true,
    //     pin: true, // pin the trigger element while active
    //     start: "top top", // when the top of the trigger hits the top of the viewport
    //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    //     end: "+=500", // end after scrolling 500px beyond the start
    //     snap: {
    //       snapTo: "labels", // snap to the closest label in the timeline
    //       duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
    //       delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
    //       ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
    //     },
    //   },
    // });

    gsap.utils.toArray(".card").forEach((el) => {
      let tl = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: el,
          start: "top bottom", // when the top of the trigger hits the top of the viewport
          end: "+=200",
          toggleActions: "play none none reverse",
          scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      });

      tl.fromTo(el, { opacity: 0, x: 100, stagger: 0.2 }, { opacity: 1, x: 0 });

      // .addLabel("color")
      // .from(".card", { backgroundColor: "#28a92b" })
      // .addLabel("spin")
      // .to(".card", { rotation: 360 })
      // .addLabel("end");
    });
    console.log("Loaded");
  }, [isMobile]);

  return (
    <div
      className={
        mobile ? styles.mobileEventCardsContainer : styles.eventCardsContainer
      }
    >
      <div
        className={
          mobile ? `${styles.mobileEvent} card` : `${styles.event} card`
        }
        ref={cardRef1}
      >
        <span
          className={mobile ? styles.mobileEventImages : styles.eventImages}
        >
          <Image
            src="/images/red_cross_canada.jpg"
            alt="Teddybear"
            width={mobile ? 500 : 250}
            height={mobile ? 500 : 250}
          />
        </span>
        <span
          className={mobile ? styles.mobileEventContents : styles.eventContents}
        >
          <div
            className={
              mobile ? styles.mobileEventsCardHeader : styles.eventsCardHeader
            }
          >
            <h2>Charity Event - Canadian Red Cross</h2>
            <p>February 27, 2022 - March 6, 2022</p>
            <p>Ukrainain Humanitarian Crisis Appeal</p>
          </div>
          <div
            className={
              mobile
                ? styles.mobileEventCardDescription
                : styles.eventCardDescription
            }
          >
            <p>
              The NegiNeko team managed to raise CA$2,371 to provide
              humanitarian relief in Ukraine in two streams, cycling through all
              of Tokyo&#39;s Yamanote line stations (Central Tokyo&#39;s main
              line)
            </p>
          </div>
        </span>
      </div>

      <div
        className={
          mobile ? `${styles.mobileEvent} card` : `${styles.event} card`
        }
        ref={cardRef2}
      >
        <span
          className={mobile ? styles.mobileEventImages : styles.eventImages}
        >
          <Image
            src="/images/twitch_glitch_event.png"
            alt="Twitch event logo"
            width={mobile ? 500 : 250}
            height={mobile ? 500 : 250}
          />
        </span>
        <span
          className={mobile ? styles.mobileEventContents : styles.eventContents}
        >
          <div
            className={
              mobile ? styles.mobileEventsCardHeader : styles.eventsCardHeader
            }
          >
            <h2>Twitch Japan - Glitch EXP Event</h2>
            <p>March 25, 2022 - April 3, 2022</p>
            <p>Twitch 新生活応援祭2022</p>
          </div>
          <div
            className={
              mobile
                ? styles.mobileEventCardDescription
                : styles.eventCardDescription
            }
          >
            <p>
              Entered Twitch Japan&apos;s second event. Level 8 achieved in 2
              streams
            </p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Events;
