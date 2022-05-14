import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import styles from "../../styles/store.module.css";
import { server } from "../../config/index";
import Image from "next/image";
import ProductCard from "../../components/store/ProductCard";

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/store`, {
    headers: { key: "orange_is_orange" },
  });
  const data = await res.json();

  return {
    props: { data },
  };
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage({ data }) {
  const [priceId, setPriceId] = useState([]);
  console.log(data);

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

  const productsMap = data.map((product) => {
    return (
      <ProductCard
        product={product}
        key={product.id}
        priceId={priceId}
        setPriceId={setPriceId}
      />
    );
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>The NegiNeko Subscriber Store</h1>
        <p>This store is exclusive to the NegiNeko channel subscribers</p>
        <p>(Orange is currently testing this page)</p>
      </div>
      <div className={styles.storePageContainer}>{productsMap}</div>
      <form
        action="/api/checkout_sessions"
        method="POST"
        className={styles.checkoutForm}
      >
        <section className={styles.section}>
          <button
            type="submit"
            role="link"
            className={
              priceId.length > 0
                ? styles.checkoutButton
                : styles.hideCheckoutButton
            }
          >
            Checkout
          </button>
          <input type="hidden" name="product" value={priceId} />
        </section>
      </form>
    </>
  );
}
