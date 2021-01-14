import React, { useEffect, useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <div className="search">
      <div>
        <IdleTimer ref={idleTimerRef} timeout={500} onIdle={onIdle}></IdleTimer>
      </div>
      <div className="search__container">
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
        <div className="search__buttons">
          {button ? (
            <div className="search__button">B</div>
          ) : (
            <div className="search__button" onClick={handleXButton}>
              C
            </div>
          )}
        </div>
      </div>
      <div className="search__results"></div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default SearchBar;
