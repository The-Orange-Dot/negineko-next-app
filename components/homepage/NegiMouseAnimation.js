import gsap from "gsap";

export const mouseIn = (id) => {
  gsap.to(`#${id}`, { yoyo: true, yoyoEase: true });
};

export const mouseOut = (id) => {
  gsap.to(`#${id}`, {});
};
