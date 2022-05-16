const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const productArray = req.body.product;

  const parsedItems = productArray.split(",").map((item) => {
    return {
      price: item,
      quantity: 1,
      tax_rates: ["txr_1KyzkECsaqCLx2xL81dnE9sc"],
    };
  });

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: parsedItems,
        payment_method_types: ["card"],
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 600,
                currency: "jpy",
              },
              display_name: "Regular",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 7,
                },
                maximum: {
                  unit: "business_day",
                  value: 14,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "jpy",
              },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/store/?success=true`,
        cancel_url: `${req.headers.origin}/store/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
