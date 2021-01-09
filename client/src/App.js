// import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./redux/actions/productActions";
import { listCategories } from "./redux/actions/categoryActions";

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
    // dispatch(listProducts());
    dispatch(listCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(products);
  console.log("Category list:", categories);

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
}

export default App;
