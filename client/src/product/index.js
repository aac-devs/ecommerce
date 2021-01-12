import React from "react";

let contProduct = 0;
const Product = ({ product }) => {
  console.log("Renderiza product", contProduct);
  contProduct++;
  console.log(product.images[0].url);

  return (
    <div className="product">
      <div className="product__images">
        <div
          className="product__main-image"
          style={{
            backgroundImage: `url(${product.images[0].url})`,
          }}
        ></div>
        <div className="product__thumb-images"></div>
      </div>
      <div className="product__details"></div>
    </div>
  );
};

export default Product;
