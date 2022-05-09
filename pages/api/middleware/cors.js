import Cors from "cors";
import initMiddleware from "./initMiddleware";
import { server } from "../../../config";
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, PATCH and OPTIONS
    methods: ["GET", "PATCH", "OPTIONS"],
    origin: server,
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}
