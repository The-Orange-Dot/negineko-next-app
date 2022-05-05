import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { locationId } = req.query;

  if (req.method === "GET") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });
    res.status(200).json(location);
  } else if (req.method === "POST") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });
    location.likes += 1;
    res.status(200).json(location);
  }
}
