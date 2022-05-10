import axios from "axios";

export const GET_FOODS = "GET_FOODS";
export const GET_FOOD_DETAIL = "GET_FOOD_DETAIL";
export const GET_FILTER_FOODS = "GET_FILTER_FOODS";
export const GET_TYPES = "GET_TYPES";
export const SET_SORT = "SET_SORT";
export const GET_FOODS_NAME = "GET_FOODS_NAME";
export const RESET = "RESET";
export const CREATE = "CREATE";

export function getFoods() {
  return function (dispatch) {
    const data = JSON.parse(localStorage.getItem("foods"));

    if (data) {
      dispatch({ type: GET_FOODS, payload: data });
    } else {
      axios.get("http://localhost:3001/recipes").then((res) => {
        dispatch({ type: GET_FOODS, payload: res.data });
      });
    }
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
  const data = JSON.parse(localStorage.getItem("types"));

  if (data) {
    dispatch({ type: GET_TYPES, payload: data });
  } else {
    axios.get(`http://localhost:3001/types?types=${types}`).then((json) => {
      dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    });
  }
};

export const setSort = (value) => (dispatch) => {
  dispatch({ type: SET_SORT, payload: value });
};

export const getRecipesByName = (name) => {
  return function (dispatch) {
    axios(`http://localhost:3001/recipes?name=${name}`).then((res) =>
      dispatch({ type: GET_FOODS_NAME, payload: res.data })
    );
  };
};

export const resetDetail = () => (dispatch) => {
  dispatch({ type: RESET });
};

export const createFood = (image, form) => (dispatch) => {
  axios
    .post("https://api.cloudinary.com/v1_1/db4adidql/upload", image)
    .then((res) => {
      console.log(form, "1");
      form.image = res.data.secure_url;

      axios
        .post("http://localhost:3001/createFood", form)
        .then((res) => dispatch({ type: CREATE, payload: res.data }));
    });
};
