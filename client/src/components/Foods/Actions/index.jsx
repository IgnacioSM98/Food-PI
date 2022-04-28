import React from "react";
import SearchBar from "../SearchBar";
import Filtros from "../FIltros";
import "./index.css";

export default function Actions() {
  return (
    <div className="actions">
      <SearchBar />
      <Filtros />
    </div>
  );
}
