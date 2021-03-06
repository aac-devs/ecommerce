import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  // productDetailsReducer,
  productSearchReducer,
} from "./reducers/productReducers";
import {
  categoryReducer,
  // categoryListReducer,
  // categoryUpdateReducer,
  // categoryCreateReducer,
  // categoryDeleteReducer,
  // categoryFetchState,
} from "./reducers/categoryReducers";
// import { imagesListReducer } from "./reducers/imagesReducers";

const initialState = {
  // userSignin: {
  //   userInfo: localStorage.getItem("userInfo")
  //     ? JSON.parse(localStorage.getItem("userInfo"))
  //     : null,
  // },
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingAddress: localStorage.getItem("shippingAddress")
  //     ? JSON.parse(localStorage.getItem("shippingAddress"))
  //     : {},
  //   paymentMethod: "PayPal",
  // },
};

const reducers = combineReducers({
  // Reducers relacionados con Product:
  productList: productListReducer,
  // productDetails: productDetailsReducer,
  productSearch: productSearchReducer,

  // Reducers relacionados con Category:
  categoryData: categoryReducer,
  // categoryUpdate: categoryUpdateReducer,
  // categoryCreate: categoryCreateReducer,
  // categoryDelete: categoryDeleteReducer,
  // categoryFetchState: categoryFetchState,

  // imagesList: imagesListReducer,
  // productDetails: productDetailsReducer,
  // cart: cartReducer,
  // userSignin: userSigninReducer,
  // userRegister: userRegisterReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
