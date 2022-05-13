import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getRecipesByName, getFoods } from "../../../../actions";
import { connect } from "react-redux";
import "./index.css";

function SearchNavBar(props) {
  const [search, setSearch] = useState();

  const handleSearch = () => {
    if (search) props.getRecipesByName(search);

    props.getFoods();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bar">
      <input
        type="text"
        placeholder="Busca por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input type="submit" onClick={handleSearch} />

      <div>
        <Link to="/createFood">
          <button>Crea tu receta</button>
        </Link>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipesByName: (name) => dispatch(getRecipesByName(name)),
    getFoods: () => dispatch(getFoods()),
  };
}

export default connect(null, mapDispatchToProps)(SearchNavBar);
