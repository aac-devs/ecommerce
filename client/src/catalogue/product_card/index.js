import React from "react";
import Reviews from "./Reviews";

const ProductCard = ({ name, image, reviews, price }) => {
  console.log(image);
  return (
    <div className="card">
      <div
        className="card__img"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <hr></hr>
      <h1 className="text-title card__price">
        $ {price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </h1>
      <h1 className="text-body card__title">{name}</h1>
      <div className="card__filler"></div>
      <div className="card__reviews">
        <Reviews qualification={reviews} num={48} />
      </div>
      <button className="btn card__button">add to cart</button>
    </div>
  );
};

export default ProductCard;
