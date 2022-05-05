import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { locationId } = req.query;

  if (req.method === "GET") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });
    res.status(200).json(location);
  } else if (req.method === "PUT") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });

    location.likes++;

    res.status(201).json(location.likes);
  }
}
