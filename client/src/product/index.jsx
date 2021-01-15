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
    <div className="product flex-row-center-stretch">
      <div className="product__images flex-column-center-center">
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
      <div className="product__details flex-column-start-stretch">
        <h2 className="product__name">{product.name}</h2>
        <div className="product__description product__line">
          <h3>{product.description}</h3>
        </div>
        <div className="product__line">
          <h4>Brand:</h4>
          <p>{product.brand}</p>
        </div>
        <div className="product__line">
          <h4>Origin:</h4>
          <p>{product.origin}</p>
        </div>
        <div className="product__line">
          <h4>Condition:</h4>
          <p>{product.condition}</p>
        </div>
        <div className="product__line">
          <h4>Price:</h4>
          <p>
            $ {product.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </p>
        </div>
        <div className="product__line">
          <h4>Stock:</h4>
          <p>{product.stock}</p>
        </div>
        <div className="product__filler"></div>
        <div className="product__reviews">
          <Reviews qualification={reviews} num={48} />
        </div>
        <button
          className="product__button button button--light"
          onClick={handleAddToCart}
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
