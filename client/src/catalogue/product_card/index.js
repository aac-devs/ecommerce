import React from "react";
import Reviews from "./Reviews";

const ProductCard = ({
  product,
  reviews,
  onDetailsClick,
  onAddToCartClick,
}) => {
  const { name, id, images, price } = product;
  const image = images[0].url;

  return (
    <div className="card">
      <div
        id={id}
        className="card__image"
        style={{
          backgroundImage: `url(${image})`,
        }}
        onClick={onDetailsClick}
      ></div>
      <hr
        style={{
          width: "100%",
        }}
      ></hr>
      <h1 className="text__title">
        $ {price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </h1>
      <h1
        id={id}
        className="text__subtitle card__name"
        onClick={onDetailsClick}
      >
        {name}
      </h1>
      <div className="card__filler"></div>
      <div className="text__thumb card__reviews">
        <Reviews qualification={reviews} num={48} />
      </div>
      <button
        id={id}
        className="global__button global__button--light card__button"
        onClick={onAddToCartClick}
      >
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;
