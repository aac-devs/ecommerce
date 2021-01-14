import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  // PRODUCT_SEARCH_RESET,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("http://localhost:5000/products/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// export const productDetails = (id) => async (dispatch) => {
//   dispatch({
//     type: PRODUCT_DETAILS_REQUEST,
//   });
//   try {
//     const { data } = await Axios.get(`http://localhost:5001/products/${id}`);
//     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
//   }
// };

export const productSearch = (query) => async (dispatch) => {
  dispatch({
    type: PRODUCT_SEARCH_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/search?query=${query}`
    );
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error.message });
  }
};
