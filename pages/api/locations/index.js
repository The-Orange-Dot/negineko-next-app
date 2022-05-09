import prisma from "../../../lib/prisma";
import protectAPI from "../middleware/protectAPI";

async function handler(req, res) {
  const locations = await prisma.location.findMany();
  if (req.method === "GET") {
    res.status(200).json(locations);
  }
}

export default protectAPI(handler);
