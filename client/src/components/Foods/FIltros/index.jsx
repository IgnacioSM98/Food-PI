import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypes } from "../../../actions";
import "./index.css";

export default function Filtros({ setSort }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const foods = useSelector((state) => state.foods);
  const [typesOfDiets, setDiets] = useState([]);

  useEffect(() => {
    const typesAux = foods?.map((food) => {
      return food.diets?.map((diet) => {
        return diet.charAt(0).toUpperCase() + diet.slice(1);
      });
    });

    setDiets([...new Set(typesAux.flat())]);
  }, [foods]);

  useEffect(() => {
    dispatch(getTypes(typesOfDiets));
  }, [typesOfDiets]);

  const handleSortDiet = (e) => {
    // dispatch(sortRecipesBy(e.target.value));
  };

  const handleFilterBy = (e) => {
    // dispatch(filterBy(e.target.value));
  };

  const handleOnChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="filtros">
      <div>
        <select
          name="sort"
          id="sort"
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option value="DEFAULT">Alphabetical Order</option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select
          name="points"
          id="points"
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option value="DEFAULT">Order by points</option>
          <option value="Highest SpoonScore">Lowest to highest score</option>
          <option value="Lowest SpoonScore">Highest to lowest score</option>
        </select>
        <select name="diets" id="diets" defaultValue="DEFAULT">
          <option value="DEFAULT">Type of Diet</option>
          {types.length > 0 ? (
            types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))
          ) : (
            <option>Loading....</option>
          )}
        </select>
      </div>
    </div>
  );
}
