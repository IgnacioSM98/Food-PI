import {
  GET_FOODS,
  GET_FILTER_FOODS,
  GET_FOOD_DETAIL,
  GET_TYPES,
  SET_SORT,
  GET_FOODS_NAME,
  RESET,
  CREATE,
} from "../actions";

const initialState = {
  foods: [],
  foodDetail: {},
  filteredFoods: [],
  types: [],
  recipeCreated: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODS:
      if (action.payload) {
        return {
          ...state,
          foods: action.payload,
          filteredFoods: action.payload,
        };
      }
    case GET_FOOD_DETAIL:
      return {
        ...state,
        foodDetail: action.payload,
      };
    case GET_FILTER_FOODS:
      return {
        ...state,
        filteredFoods: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case SET_SORT:
      if (action.payload !== "DEFAULT") {
        const filteredAux = [...state.filteredFoods];

        filteredAux.sort((a, b) => {
          if (action.payload === "A-Z")
            return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
          if (action.payload === "Z-A")
            return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
          if (action.payload === "Highest SpoonScore")
            return a.score > b.score ? 1 : b.score > a.score ? -1 : 0;
          if (action.payload === "Lowest SpoonScore")
            return a.score < b.score ? 1 : b.score < a.score ? -1 : 0;
        });

        return {
          ...state,
          filteredFoods: filteredAux,
        };
      }

      return {
        ...state,
        filteredFoods: [...state.foods],
      };
    case GET_FOODS_NAME:
      return {
        ...state,
        foods: action.payload,
        filteredFoods: action.payload,
      };
    case RESET:
      return {
        ...state,
        foodDetail: {},
        filteredFoods: state.foods,
      };
    case CREATE:
      console.log(action.payload, "xd?????");
      localStorage.setItem("foods", JSON.stringify(action.payload));

      return {
        ...state,
        foods: state.foods.concat(action.payload),
        filteredFoods: state.filteredFoods.concat(action.payload),
        recipeCreated: action.payload,
      };
    default:
      return state;
  }
}
