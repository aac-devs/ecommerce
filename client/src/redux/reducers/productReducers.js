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
  PRODUCT_SEARCH_RESET,
} from "../constants/productConstants";

export const productListReducer = (
  state = { loading: true, success: false, list: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// export const productDetailsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST:
//       return { loading: true };
//     case PRODUCT_DETAILS_SUCCESS:
//       return { loading: false, product: action.payload };
//     case PRODUCT_DETAILS_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const productSearchReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_SEARCH_REQUEST:
//       return { loading: true };
//     case PRODUCT_SEARCH_SUCCESS:
//       return { loading: false, list: action.payload };
//     case PRODUCT_SEARCH_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_SEARCH_RESET:
//       return {};
//     default:
//       return state;
//   }
// };
