import NextCors from "nextjs-cors";
import { server } from "../../../config";

const protectAPI = async (req, res) => {
  const whitelist = [req.headers.host];

  await NextCors(req, res, {
    methods: ["PATCH", "GET"],
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });
};

export default protectAPI;
