import prisma from "../../../lib/prisma";
import protectAPI from "../middleware/protectAPI";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function handler(req, res) {
  await protectAPI(req, res, cors);
  const locations = await prisma.location.findMany();
  if (req.method === "GET") {
    res.status(200).json(locations);
  }
}

export default handler;
