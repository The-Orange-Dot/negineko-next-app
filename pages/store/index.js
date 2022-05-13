import React from "react";
import { useState } from "react";
import Checkout from "../../components/store/checkout";

const Store = () => {
  const [productId, setProductId] = useState("");

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setProductId("price_1KypynCsaqCLx2xLRAvslsse");
            // console.log(productId);
          }}
        >
          Test Haro
        </button>
        <button
          onClick={() => {
            setProductId("price_1KyvOvCsaqCLx2xLMYIYfAl5");
            // console.log(productId);
          }}
        >
          Test RX-78F00
        </button>
      </div>
      <div>
        <Checkout productId={productId} />
      </div>
    </div>
  );
};

export default Store;
