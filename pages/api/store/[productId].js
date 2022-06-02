import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { userInfo } from "os";

async function handler(req, res) {
  const corsreq = req.headers.key;
  const corsKey = process.env.CORS_KEY;

  await NextCors(req, res, {
    methods: ["GET", "PATCH"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
      }
    },
  });

  const { productId } = req.query;

  // if (req.method === "PATCH") {
  //   const product = await prisma.product.update({
  //     where: { id: productId },
  //     data: { sold: true, buyer: user, price_id: null },
  //   });
  // } else if (req.method === "GET") {
  //   const product = await prisma.product.findUnique({
  //     where: { id: productId },
  //   });

  //   res.status(200).json(product);
  // }

  res.end();
}

export default handler;
