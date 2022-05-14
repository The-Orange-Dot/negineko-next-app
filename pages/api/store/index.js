import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";

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

  const products = await prisma.product.findMany();
  const parsedProducts = products.map((product) => {
    return {
      name: product.name,
      description: product.description,
      priceId: product.price_id,
      images: product.images,
      price: product.price,
      sold: product.sold,
    };
  });
  if (req.method === "GET") {
    res.status(200).json(parsedProducts);
  }
}

export default handler;
