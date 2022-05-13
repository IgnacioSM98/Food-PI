import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Food({ id, name, score, img, diets }) {
  return (
    <div className="card">
      <Link to={`/recipes/${id}`}>
        <img className="food-img" src={img} alt="xd" />
        <div className="info">
          <div className="titulo">
            <h3>{name}</h3>
          </div>
          <h5>Score: {score}</h5>
          <ul className="types">
            {diets?.map((tipo, index) => (
              <li key={index}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}
