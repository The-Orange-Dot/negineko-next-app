import prisma from "../../../lib/prisma";
import protectAPI from "../middleware/protectAPI";

async function handler(req, res) {
  const users = await prisma.user.findMany();
  if (req.method === "GET") {
    res.status(200).json(users);
  }
}

export default protectAPI(handler);
