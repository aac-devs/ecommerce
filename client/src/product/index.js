import React from "react";
import Reviews from "../catalogue/product_card/Reviews";
import Carousel from "../components/carousel/Carousel";

let contProduct = 0;
const Product = ({ product, reviews }) => {
  console.log("Renderiza product", contProduct);
  contProduct++;

  const css_image_url = product.images[0].url;
  let image_id = product.images[0].id;
  document.documentElement.style.setProperty(
    "--image-url",
    `url(${css_image_url})`
  );

  const handleImageClick = (id) => {
    if (image_id !== id) {
      console.log("Image printed");
      const css_image_url = product.images.filter(
        (img) => img.id.toString() === id.toString()
      );
      document.documentElement.style.setProperty(
        "--image-url",
        `url(${css_image_url[0].url})`
      );
      image_id = id;
    }
  };
  const handleAddToCart = (id) => {
    console.log("Add to cart product", product.id);
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__main-image"></div>
        <div className="product__thumb-images">
          <Carousel
            data={product.images}
            size={78}
            simultaneous={3}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
      <div className="product__details">
        <div className="product__name text__title">{product.name}</div>
        <div className="product__description product__line">
          <span className="text__paragraph">{product.description}</span>
        </div>
        <div className="product__line">
          <span className="text__label">Brand:</span>
          <span className="text__paragraph">{product.brand}</span>
        </div>
        <div className="product__line">
          <span className="text__label">Origin:</span>
          <span className="text__paragraph">{product.origin}</span>
        </div>
        <div className="product__line">
          <span className="text__label">Condition:</span>
          <span className="text__paragraph">{product.condition}</span>
        </div>
        <div className="product__line">
          <span className="text__label">Price:</span>
          <span className="text__paragraph">
            $ {product.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </span>
        </div>
        <div className="product__line">
          <span className="text__label">Stock:</span>
          <span className="text__paragraph">{product.stock}</span>
        </div>
        <div className="product__filler"></div>
        <div className="product__reviews">
          <Reviews qualification={reviews} num={48} />
        </div>
        <div
          className="product__button global__button global__button--light"
          onClick={handleAddToCart}
        >
          add to cart
        </div>
      </div>
    </div>
  );
};

export default Product;
