import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";

export const mouseIn = (id, jp) => {
  gsap.registerPlugin(TextPlugin);

  gsap.to(`#${id}`, {
    text: { value: `${jp}`, padSpace: true, preserveSpaces: true },
    duration: 0.2,
    opacity: 0.5,
  });
};

export const mouseOut = (id, eng) => {
  gsap.registerPlugin(TextPlugin);

  gsap.to(`#${id}`, {
    text: { value: `${eng}`, padSpace: true, preserveSpaces: true },
    duration: 0.2,
    opacity: 1,
  });
};
