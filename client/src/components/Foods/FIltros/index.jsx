import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypes, setSort } from "../../../actions";
import { connect } from "react-redux";
import "./index.css";

function Filtros(props) {
  const [typesOfDiets, setDiets] = useState([]);

  useEffect(() => {
    const typesAux = props.foods?.map((food) => {
      return food.diets?.map((diet) => {
        return diet.charAt(0).toUpperCase() + diet.slice(1);
      });
    });

    setDiets([...new Set(typesAux.flat())]);
  }, [props.foods]);

  useEffect(() => {
    if (typesOfDiets.length > 0) {
      props.getTypes(typesOfDiets);
    }
  }, [typesOfDiets]);

  const handleOnChange = (e) => {
    props.setSort(e.target.value);
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
        <select
          name="diets"
          id="diets"
          defaultValue="DEFAULT"
          onChange={(e) => props.setSelected(e.target.value)}
        >
          <option value="DEFAULT">Type of Diet</option>
          {props.types.length > 0 ? (
            props.types.map((type) => (
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

function mapStateToProps(state) {
  return {
    foods: state.foods,
    types: state.types,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTypes: (types) => dispatch(getTypes(types)),
    setSort: (value) => dispatch(setSort(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros);
