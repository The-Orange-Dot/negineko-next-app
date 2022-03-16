import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const locations = await prisma.location.findMany();
  if (req.method === "GET") {
    res.status(200).json(locations);
  } else if (req.method === "POST") {
    const comment = req.body.comment;
    const newComment = {
      id: Date.now(),
      comment: comment,
    };
    locations.push(newComment);
    res.status(201).json(newComment);
  }
}
