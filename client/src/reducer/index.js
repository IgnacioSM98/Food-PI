import {
  GET_FOODS,
  FILTER_FOODS,
  GET_FOOD_DETAIL,
  GET_TYPES,
} from "../actions";

const initialState = {
  foods: [],
  foodDetail: {},
  filteredFoods: [],
  types: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODS:
      return {
        ...state,
        foods: action.payload,
        filteredFoods: action.payload,
      };
    case GET_FOOD_DETAIL:
      return {
        ...state,
        foodDetail: action.payload,
      };
    case FILTER_FOODS:
      return {
        ...state,
        filteredFoods: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload.data,
      };
    default:
      return state;
  }
}
