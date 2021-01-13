import React from "react";
import Carousel from "../components/carousel/Carousel";

let contProduct = 0;
const Product = ({ product }) => {
  console.log("Renderiza product", contProduct);
  contProduct++;
  // console.log(product.images[0]);

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

  return (
    <div className="product">
      <div className="product__images">
        <div
          className="product__main-image"
          // style={{
          //   backgroundImage: `url(${product.images[0].url})`,
          // }}
        ></div>
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
        <div className="product__description text__paragraph">
          {product.description}
        </div>
        <div className="product__brand">Brand: {product.brand}</div>
        <div className="product__origin">Origin: {product.origin}</div>
        <div className="product__condition">Condition: {product.condition}</div>
        <div className="product__price text__subtitle">
          Price: {product.price}
        </div>
        <div className="product__stock">Stock: {product.stock}</div>
        <div className="product__filler"></div>
        <div className="product__reviews text__thumb">reviews</div>
        <div className="product__button">button</div>
      </div>
    </div>
  );
};

export default Product;
