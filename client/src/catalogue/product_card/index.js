import React from "react";
import Reviews from "./Reviews";

const ProductCard = ({ name, image, reviews, price }) => {
  console.log(image);
  return (
    <div className="product-card-container">
      <div
        className=""
        style={{
          backgroundImage: `url(${image})`,
          width: "18rem",
          height: "18rem",
          backgroundColor: "white",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "1px solid #ddd",
        }}
      ></div>
      <div>
        <div>
          <h2>$ {price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</h2>
          <h3>{name}</h3>
        </div>
        <div>
          <div>
            <Reviews qualification={reviews} size={20} />
            <span>
              <h5>xxx reviews</h5>
            </span>
          </div>
          <button className="btn">add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
