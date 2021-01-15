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
    <div className="card flex-column-center-stretch">
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
      <h2>$ {price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</h2>
      <h3
        id={id}
        className="text__subtitle card__name"
        onClick={onDetailsClick}
      >
        {name}
      </h3>
      <div className="card__filler"></div>
      <div className="text__thumb card__reviews">
        <Reviews qualification={reviews} num={48} />
      </div>
      <button
        id={id}
        className="button button--light card__button"
        onClick={onAddToCartClick}
      >
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;
