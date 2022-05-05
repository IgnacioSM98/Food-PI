import axios from "axios";

export const GET_FOODS = "GET_FOODS";
export const GET_FOOD_DETAIL = "GET_FOOD_DETAIL";
export const GET_FILTER_FOODS = "GET_FILTER_FOODS";
export const GET_TYPES = "GET_TYPES";
export const SET_SORT = "SET_SORT";

export function getFoods() {
  return function (dispatch) {
    axios.get("http://localhost:3001/recipes").then((res) => {
      dispatch({ type: GET_FOODS, payload: res.data });
    });
  };
}

export function getFilterFoods(filteredFoods) {
  return function (dispatch) {
    dispatch({ type: GET_FILTER_FOODS, payload: filteredFoods });
  };
}

export function getFoodDetail(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
      dispatch({ type: GET_FOOD_DETAIL, payload: res.data });
    });
  };
}

export const getTypes = (types) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/types?types=${types}`)
    .then((json) => {
      dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    });
};

export const setSort = (value) => (dispatch) => {
  dispatch({ type: SET_SORT, payload: value });
};
