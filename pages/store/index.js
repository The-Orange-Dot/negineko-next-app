import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import styles from "../../styles/store.module.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
  const [priceId, setPriceId] = useState([]);

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    console.log(priceId);
  }, [priceId]);

  const shoppingCartHandler = (id) => {
    if (priceId.includes(id)) {
      const filtered = priceId.filter((product) => {
        return product !== id;
      });
      setPriceId(filtered);
    } else {
      setPriceId([...priceId, id]);
    }
  };

  return (
    <>
      <div className={styles.storePageContainer}>
        <span className={styles.cardContainer}>
          <h2> Test RX-78F00 Gundam</h2>
          <button
            onClick={() => {
              shoppingCartHandler("price_1KyvOvCsaqCLx2xLMYIYfAl5");
            }}
          >
            Add to Cart{" "}
          </button>
        </span>
        <span className={styles.cardContainer}>
          <h2> Haro Test Product</h2>
          <button
            onClick={() => {
              shoppingCartHandler("price_1KypynCsaqCLx2xLRAvslsse");
            }}
          >
            Add to cart{" "}
          </button>
        </span>
      </div>
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button type="submit" role="link">
            Checkout
          </button>
          <input type="hidden" name="product" value={priceId} />
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 112px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    </>
  );
}
