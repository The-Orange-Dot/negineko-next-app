import prisma from "../../../lib/prisma";
import protectAPI from "../middleware/protectAPI";
import Cors from "cors";
import { server } from "../../../config";

const cors = Cors({
  methods: ["GET", "PATCH", "HEAD"],
  origin: server,
});

async function handler(req, res) {
  await protectAPI(req, res, cors);

  const { locationId } = req.query;

  if (req.method === "GET") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });
    res.status(200).json(location);
  } else if (req.method === "PATCH") {
    const location = await prisma.location.update({
      where: { id: parseInt(locationId) },
      data: { likes: req.body.updatedLiked },
    });
    res.status(201).json(location);
  }
}

export default handler;
