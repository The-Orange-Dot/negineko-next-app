import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";

export const mouseIn = (text: string, jp: string) => {
  gsap.registerPlugin(TextPlugin);

  gsap
    .timeline()
    .to(`#${text}`, { opacity: 0, duration: 0.3 })
    .to(`#${text}`, {
      text: { value: `${jp}` },
      duration: 0,
    })
    .to(`#${text}`, { opacity: 1, duration: 0.3 });
};

export const mouseOut = (text: string, eng: string) => {
  gsap.registerPlugin(TextPlugin);

  gsap
    .timeline()
    .to(`#${text}`, { opacity: 0, duration: 0.3 })
    .to(`#${text}`, {
      text: { value: `${eng}` },
      duration: 0,
    })
    .to(`#${text}`, { opacity: 1, duration: 0.3 });
};
