import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import styles from "../../styles/store.module.css";
import { server } from "../../config/index";
import ProductCard from "../../components/store/ProductCard";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/store`, {
    headers: { key: "orange_is_orange" },
  });

  const data = await res.json();

  return {
    props: { data: data || null },
  };
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage({ data }) {
  const [priceId, setPriceId] = useState([]);
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const session = useSession();
  const username = session?.data?.name;
  console.log(username);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      fetch(`${server}/api/store`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: priceId, username: username }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      console.log(data);
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    setProducts(data);
    console.log(priceId);
  }, [priceId, data, isMobile, username]);

  const productsMap = products?.map((product) => {
    return (
      <ProductCard
        product={product}
        key={product.id}
        priceId={priceId}
        setPriceId={setPriceId}
        mobile={mobile}
      />
    );
  });

  return (
    <>
      <div className={mobile ? styles.mobilePageHeader : styles.pageHeader}>
        <h1>The NegiNeko Store</h1>
        <p>(Orange is currently testing this page)</p>
        <p>
          All data and stripe info is in test mode and is subjected to change
        </p>
      </div>
      <div
        className={
          mobile ? styles.mobileStorePageContainer : styles.storePageContainer
        }
      >
        {productsMap}
      </div>
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
                ? mobile
                  ? styles.mobileCheckoutButton
                  : styles.checkoutButton
                : mobile
                ? styles.mobileHideCheckoutButton
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
