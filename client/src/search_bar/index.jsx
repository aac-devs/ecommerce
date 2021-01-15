import React, { useEffect, useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../catalogue/product_card";
import { productSearch } from "../redux/actions/productActions";
import { PRODUCT_SEARCH_RESET } from "../redux/constants/productConstants";

let countSearch = 0;

const SearchBar = () => {
  const dispatch = useDispatch();
  const productsFound = useSelector((state) => state.productSearch);
  const [button, setButton] = useState(true);
  const [value, setValue] = useState("");
  const [fetch, setFetch] = useState("");
  const idleTimerRef = useRef(null);

  console.log("----------------------");
  console.log("Renderiza SearchBar", countSearch);
  countSearch++;
  console.log("Products Found:", productsFound.list);

  useEffect(() => {
    if (fetch !== "" && fetch !== " ") {
      dispatch(productSearch(fetch));
    } else {
      dispatch({
        type: PRODUCT_SEARCH_RESET,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  function handleXButton(e) {
    setButton(true);
    setValue("");
  }

  function handleClick(e) {
    setButton(false);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  const onIdle = () => {
    setFetch(value);
  };

  const handleAddToCart = (e) => {
    console.log("Add to cart:", e.target.id);
  };

  const handleProductDetail = (e) => {
    console.log("Product details:", e.target.id);
  };

  return (
    <div className="search flex-column-start-center">
      <div>
        <IdleTimer ref={idleTimerRef} timeout={500} onIdle={onIdle}></IdleTimer>
      </div>
      <div className="search__container">
        <div className="search__window flex-row-center-center">
          <input
            className="search__input"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            onClickCapture={handleClick}
            onChange={handleChange}
            value={value}
          ></input>
          <div className="search__buttons flex-row-center-center">
            {button ? (
              <button className="search__button flex-row-center-center">
                <i className="fa fa-search"></i>
              </button>
            ) : (
              <button
                className="search__button flex-row-center-center"
                onClick={handleXButton}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="search__results flex-row-evenly-start">
        {productsFound.list &&
          (productsFound.list.length === 0 ? (
            <div className="search__noresults">
              No results found for the requested value.
            </div>
          ) : (
            productsFound.list.map((prod, index) => {
              return (
                <ProductCard
                  key={index}
                  product={prod}
                  reviews={3.5}
                  onAddToCartClick={handleAddToCart}
                  onDetailsClick={handleProductDetail}
                />
              );
            })
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
