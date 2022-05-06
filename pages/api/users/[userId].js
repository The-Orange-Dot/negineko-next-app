import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { username } = req.query;
  const user = await prisma.user.findFirst({
    where: { name: username },
  });

  if (req.method === "GET") {
    res.status(200).json(user);
  } else if (req.method === "PATCH") {
    let updatedLocationLikes;

    if (!user.location_likes.includes(req.body.locationName)) {
      updatedLocationLikes = [...user.location_likes, req.body.locationName];
    } else {
      updatedLocationLikes = user.location_likes.filter(
        (location) => location !== req.body.locationName
      );
    }

    const updatedUser = await prisma.user.update({
      where: { name: user.name },
      data: {
        location_likes: updatedLocationLikes,
      },
    });
    res.status(201).json(updatedUser);
  }
}