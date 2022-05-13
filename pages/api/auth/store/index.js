const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const products = await stripe.products.list({
    limit: 3,
  });

  const productsArray = products.data;
  // console.log(productsArray);

  if (req.method === "GET") {
    // const displayProducts = products;
    const displayProducts = productsArray.map((product) => {
      return {
        name: product.name,
        description: product.description,
        price_id: product.default_price,
        images: product.images,
      };
    });

    res.status(200).json(displayProducts);
  }
}
