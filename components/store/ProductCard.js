import React from "react";
import { useState } from "react";
import styles from "../../styles/store.module.css";
import { server } from "../../config/index";
import Image from "next/image";
import { numberWithCommas } from "../NumberWithCommas";

const ProductCard = ({ product, priceId, setPriceId }) => {
  const [mouseIn, setMouseIn] = useState(false);

  //ADDS AND REMOVES ITEMS FROM SHOPPING CARD IN AN ARRAY
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
    <span className={styles.cardContainer} key={product.name}>
      <div>
        <Image
          className={styles.thumbnail}
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={280}
          placeholder="blur"
          blurDataURL={product.images[0]}
          priority={true}
        />
      </div>
      <h2> {product.name}</h2>
      <p>{product.description}</p>

      <button
        onMouseEnter={() => setMouseIn(true)}
        onMouseLeave={() => setMouseIn(false)}
        className={
          priceId.includes(product.priceId)
            ? styles.productInCart
            : styles.shoppingCartButton
        }
        onClick={() => {
          shoppingCartHandler(product.priceId);
        }}
      >
        {priceId.includes(product.priceId)
          ? "Remove from Cart"
          : mouseIn
          ? "Add to Cart"
          : `¥${numberWithCommas(product.price)}`}
      </button>
    </span>
  );
};

export default ProductCard;
