import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../../source/types/next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const corsreq = req.headers.key;
  const corsKey = "orange_is_orange";

  await NextCors(req, res, {
    methods: ["GET"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
      }
    },
  });

  if (req.method === "GET") {
    const products: ProductType[] = await prisma.product.findMany();
    const parsedProducts = products?.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      priceId: product.price_id,
      images: product.images,
      price: product.price,
      sold: product.sold,
    }));

    res.status(200).json(parsedProducts);
  }
  // else if (req.method === "PATCH") {
  //   const priceArray = req.body.priceId;
  //   console.log("Price Id: ", priceArray);
  //   const username = req.body.username;
  //   console.log("Username: ", username);
  //   const updatedProducts = priceArray.map(async (priceId) => {
  //     const products = await prisma.product.update({
  //       where: { price_id: priceId },
  //       data: { sold: true, buyer: [username] },
  //     });
  //     console.log("Updated Products: ", updatedProducts);
  //     return products;
  //   });

  //   return res.status(202).json(updatedProducts);
  // }
}

export default handler;
