const dev = process.env.NODE_ENV !== "build";

export const server = dev
  ? "http://localhost:3000"
  : "https://negineko.netlify.app";
