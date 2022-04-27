import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const locations = await prisma.location.findMany();
  if (req.method === "GET") {
    res.status(200).json(locations);
  }
}
