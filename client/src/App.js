import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./redux/actions/productActions";
import { listCategories } from "./redux/actions/categoryActions";
import Catalogue from "./catalogue";
import Carousel from "./components/carousel/Carousel";
import Product from "./product";
import ProductCard from "./catalogue/product_card";
import SearchBar from "./search_bar";

let countApp = 0;

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList);
  const categories = useSelector((state) => state.categoryList);

  if (countApp === 0) {
    console.clear();
  }
  console.log("Renderiza App", countApp);
  countApp++;

  useEffect(() => {
    console.log(
      "################# Se despacha App, listProducts y listCategories"
    );
    dispatch(listProducts());
    dispatch(listCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Product list:", products);
  console.log("Category list:", categories);

  let allowRender = false;
  if (products && categories && products.success && categories.success) {
    console.log("---------permitido App");
    allowRender = true;
    console.log(products.list.data[2].images[0].url);
  }

  // const handled = (e) => {
  //   console.log("Handle de App.js");
  //   console.log(e);
  // };
  //
  const handAddTo = (e) => {
    console.log("Add to cart clicked!");
    console.log(e.target.id);
  };

  const handDetail = (e) => {
    console.log("Details clicked!");
    console.log(e.target.id);
  };

  return (
    <>
      <div className="header">mi header</div>
      <div className="main">
        {/* {allowRender ? <Catalogue /> : null} */}
        {/* {allowRender ? (
          <ProductCard
            product={products.list.data[0]}
            reviews={3.5}
            onAddToCartClick={handAddTo}
            onDetailsClick={handDetail}
          />
        ) : null} */}
        {/* {allowRender ? (
          <Product product={products.list.data[9]} reviews={3.5} />
        ) : null} */}
        {/* {allowRender ? (
          <Carousel
            data={products.list.data[2].images}
            size={78}
            simultaneous={3}
            // onImageClick={handled}
          />
        ) : null} */}
        {allowRender ? <SearchBar /> : null}
      </div>
      <div className="footer">mifooter</div>
    </>
  );
}

export default App;
