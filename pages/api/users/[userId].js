import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { username } = req.query;

  if (req.method === "GET") {
    const user = await prisma.user.findFirst({
      where: { name: username },
    });
    res.status(200).json(user);
  }
}
