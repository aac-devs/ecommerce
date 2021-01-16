import Axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  EDIT_CATEGORY_FETCH_STATE,
  ADD_CATEGORY_FETCH_STATE,
  REFRESH_LIST_CATEGORIES,
} from "../constants/categoryConstants";

export const listCategories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      "http://localhost:5000/products/category/"
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const updateCategory = (category) => async (dispatch) => {
  dispatch({
    type: CATEGORY_UPDATE_REQUEST,
  });
  try {
    const { id, name, description } = category;
    const { data } = await Axios.put(
      `http://localhost:5000/products/category/${id}`,
      {
        name,
        description,
      }
    );
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_UPDATE_FAIL, payload: error.message });
  }
};

export const createCategory = (category) => async (dispatch) => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST,
  });
  try {
    const { name, description } = category;
    const { data } = await Axios.post(
      `http://localhost:5000/products/category/`,
      {
        name,
        description,
      }
    );
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.message });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({
    type: CATEGORY_DELETE_REQUEST,
  });
  try {
    const { data } = await Axios.delete(
      `http://localhost:5000/products/category/${id}`
    );
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};
