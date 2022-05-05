import React, { useEffect } from "react";
import Food from "../Food";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useState } from "react";
import { connect } from "react-redux";
import { getFoods, getFilterFoods } from "../../actions";
import Filtros from "./Filtros";
import NavBar from "./NavBar";
import error from "../../assets/images/404.jpg";
import "./index.css";

function Foods(props) {
  const [selected, setSelected] = useState("");
  const [pages, setPages] = useState(4);
  const [pageSelected, setPageSelected] = useState(1);
  const [resVis, setResVis] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    props.getFoods();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(resVis / 9));
  }, [resVis]);

  useEffect(() => {
    setPages(Math.ceil(props.foods.length / 9));
  }, [props.foods]);

  useEffect(() => {
    setPages(Math.ceil(props.filteredFoods.filter(filterDropdown).length / 9));
  }, [selected]);

  useEffect(() => {
    console.log(props.foods.length, props.filteredFoods.length, pages, "uwu");
  }, [pages]);

  const filterPerPages = (food, i) => {
    if (i >= 9 * (pageSelected - 1) && i <= 9 * pageSelected - 1) {
      return food;
    }
  };

  const filterDropdown = (food) => {
    if (!selected || food.diets.includes(selected.toLowerCase())) {
      return food;
    }

    if (selected === "DEFAULT") {
      return food;
    }
  };

  return (
    <>
      <NavBar />
      <div className="actions">
        <SearchBar setResVis={setResVis} setFlag={setFlag} />
        <Filtros setSelected={setSelected} />
      </div>
      <div className="home">
        {flag && props.filteredFoods.length === 0 ? (
          <div className="foods-container2">
            <img src={error} />
          </div>
        ) : (
          <></>
        )}

        {props.filteredFoods.length > 0 ? (
          <div className="foods-container">
            {props.filteredFoods
              .filter(filterDropdown)
              .filter(filterPerPages)
              .map((food) => {
                if (food.name === "poshito") console.log(food);
                return (
                  <Food
                    key={food.id}
                    id={food.id}
                    name={food.name}
                    score={food.score}
                    img={food.img}
                    diets={food.diets}
                  />
                );
              })}
          </div>
        ) : (
          <></>
        )}

        {flag === false && props.filteredFoods.length === 0 ? (
          <div className="loader"></div>
        ) : (
          <></>
        )}

        {pages > 0 ? (
          <Pagination pages={pages} setPageSelected={setPageSelected} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    foods: state.foods,
    filteredFoods: state.filteredFoods,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFoods: () => dispatch(getFoods()),
    getFilterFoods: (foods) => dispatch(getFilterFoods(foods)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
