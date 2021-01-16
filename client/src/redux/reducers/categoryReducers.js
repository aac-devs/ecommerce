import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from "../constants/categoryConstants";

const categoryInitialState = {
  loading: true,
  success: false,
  list: [],
};

export const categoryReducer = (state = categoryInitialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
