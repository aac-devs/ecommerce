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
  EDIT_MODAL_STATE,
  ADD_MODAL_STATE,
  REFRESH_LIST_CATEGORIES,
} from "../constants/categoryConstants";

export const categoryListReducer = (
  state = { loading: true, success: false, list: [] },
  action
) => {
  // console.log("Estoy en categoryListReducer");
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, success: true, list: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  // console.log("Estoy en categoryUpdateReducer");
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  // console.log("Estoy en categoryCreateReducer");
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// // Maneja el estado de los Modals Edit y Add del CRUD de Categorías:
// const initialModalState = {
//   edit: false,
//   add: false,
//   refresh: false,
// };

// export const categoryModalState = (state = initialModalState, action) => {
//   // console.log("Estoy en categoryModalStateReducer");
//   switch (action.type) {
//     case EDIT_MODAL_STATE:
//       return {
//         ...state,
//         edit: action.payload,
//       };
//     case ADD_MODAL_STATE:
//       return {
//         ...state,
//         add: action.payload,
//       };
//     case REFRESH_LIST_CATEGORIES:
//       return {
//         ...state,
//         refresh: action.payload,
//       };
//     default:
//       return state;
//   }
// };
