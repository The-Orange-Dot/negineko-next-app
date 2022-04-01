import gsap from "gsap";

export const mouseIn = (id) => {
  gsap.to(`#${id}`, { opacity: 0, duration: 0.2 });
};

export const mouseOut = (id) => {
  gsap.to(`#${id}`, { opacity: 1, duration: 0.2 });
};
