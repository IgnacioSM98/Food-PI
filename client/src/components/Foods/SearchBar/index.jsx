import React from "react";
import { connect } from "react-redux";
import { filterFoods } from "../../../actions";
import "./index.css";

function SearchBar(props) {
  function onChangeHandle(e) {
    const value = e.target.value;

    props.setResVis(0);

    const arrayAux = props.foods.filter((food) => {
      const name = food.name.toLowerCase();
      const isVisible = name.includes(value.toLowerCase());

      isVisible && props.setResVis((prev) => prev + 1);

      if (isVisible) {
        return food;
      }
    });
    props.filterFoods(arrayAux);
  }

  return (
    <div className="search">
      <form>
        <input
          type="text"
          placeholder="Busca comidas"
          onChange={(e) => {
            onChangeHandle(e);
          }}
        />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    foods: state.foods,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterFoods: (foods) => dispatch(filterFoods(foods)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
