import React, { useEffect } from "react";
import Food from "../Food";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import Sort from "./Sort";
import CreateFood from "../CreateFoodButton";
import Pagination from "./Pagination";
import { useState } from "react";
import { connect } from "react-redux";
import { getFoods } from "../../actions";
import Actions from "./Actions";
import Filtros from "./FIltros";
import "./index.css";

function Foods(props) {
  const [selected, setSelected] = useState("");
  const [sort, setSort] = useState("");
  const [pages, setPages] = useState(4);
  const [pageSelected, setPageSelected] = useState(1);
  const [resVis, setResVis] = useState(0);

  useEffect(() => {
    props.getFoods();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(resVis / 9));
  }, [props.filteredFoods, resVis]);

  useEffect(() => {
    setPages(Math.ceil(props.foods.length / 9));
  }, [props.foods]);

  useEffect(() => {
    if (sort === "DEFAULT") {
      props.getFoods();
    }
  }, [sort]);

  const sortAux = (a, b) => {
    if (sort === "A-Z") return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    if (sort === "Z-A") return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
    if (sort === "Highest SpoonScore")
      return a.score < b.score ? 1 : b.score < a.score ? -1 : 0;
    if (sort === "Lowest SpoonScore")
      return a.score > b.score ? 1 : b.score > a.score ? -1 : 0;
  };

  const filterPerPages = (food, i) => {
    if (i >= 9 * (pageSelected - 1) && i <= 9 * pageSelected - 1) {
      return food;
    }
  };

  const filterDropdown = (food) => {
    if (!selected || food.diets.includes(selected.toLowerCase())) {
      return food;
    }
  };

  return (
    <>
      <div className="actions">
        <SearchBar setResVis={setResVis} />
        <Dropdown
          selected={selected}
          setSelected={setSelected}
          foods={props.filteredFoods}
        />
        <Filtros setSort={setSort} />
      </div>
      <div className="home">
        <div className="foods-container">
          {props.filteredFoods
            .sort(sortAux)
            .filter(filterDropdown)
            .filter(filterPerPages)
            .map((food) => {
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
        {pages && (
          <Pagination pages={pages} setPageSelected={setPageSelected} />
        )}
      </div>
    </>
    //   <div className="container">
    //     <div className="col1">
    //       <SearchBar setResVis={setResVis} />
    //       <Dropdown
    //         selected={selected}
    //         setSelected={setSelected}
    //         foods={props.filteredFoods}
    //       />
    //       <Sort setSort={setSort} />
    //       <CreateFood />
    //     </div>
    //     <div className="col2">
    //       <div className="foods-container">
    //         {props.filteredFoods
    //           .sort(sortAux)
    //           .filter(filterDropdown)
    //           .filter(filterPerPages)
    //           .map((food) => {
    //             return (
    //               <Food
    //                 key={food.id}
    //                 id={food.id}
    //                 name={food.name}
    //                 score={food.score}
    //                 img={food.img}
    //                 diets={food.diets}
    //               />
    //             );
    //           })}
    //       </div>
    //       {pages && (
    //         <Pagination pages={pages} setPageSelected={setPageSelected} />
    //       )}
    //     </div>
    //   </div>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
