import prisma from "../../../lib/prisma";
import protectAPI from "../middleware/protectAPI";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function handler(req, res) {
  await protectAPI(req, res, cors);
  const users = await prisma.user.findMany();
  if (req.method === "GET") {
    res.status(200).json(users);
  }
}

export default handler;
