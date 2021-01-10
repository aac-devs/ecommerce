import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./redux/actions/productActions";
import { listCategories } from "./redux/actions/categoryActions";
import Catalogue from "./catalogue";
import Carousel from "./carousel";

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
  }

  return (
    <div className="grid-container">
      <header>mi header</header>
      <main>
        {allowRender ? <Carousel data={products.list.data[5].images} /> : null}
      </main>
      {/* <main>{allowRender ? <Catalogue /> : null}</main> */}
      <footer></footer>
    </div>
  );
}

export default App;
