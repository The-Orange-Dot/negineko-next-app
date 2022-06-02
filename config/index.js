import { env } from "process";

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : process.env.BASE_URL;

const BUILD_ENV = process.env.REACT_APP_BUILD_ENV || "neginekotokyo.com";
