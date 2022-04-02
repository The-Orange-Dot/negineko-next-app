import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";

export const mouseIn = (id, jp) => {
  gsap.registerPlugin(TextPlugin);

  gsap
    .timeline()
    .to(`#${id}`, { opacity: 0, duration: 0.3 })
    .to(`#${id}`, {
      text: { value: `${jp}` },
      duration: 0,
    })
    .to(`#${id}`, { opacity: 1, duration: 0.3 });
};

export const mouseOut = (id, eng) => {
  gsap.registerPlugin(TextPlugin);

  gsap
    .timeline()
    .to(`#${id}`, { opacity: 0, duration: 0.3 })
    .to(`#${id}`, {
      text: { value: `${eng}` },
      duration: 0,
    })
    .to(`#${id}`, { opacity: 1, duration: 0.3 });
};
