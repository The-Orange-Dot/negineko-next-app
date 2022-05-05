import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const users = await prisma.user.findMany();
  if (req.method === "GET") {
    res.status(200).json(users);
  }
}
