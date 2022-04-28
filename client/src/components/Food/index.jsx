import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Food({ id, name, score, img, diets }) {
  return (
    // <div className="card">
    //   <Link to={`/recipes/${id}`}>
    //     <h2>{name}</h2>
    //   </Link>
    //   <h3>Score: {score}</h3>
    //   <img src={img} alt="alt" />
    //   <div className="diets">
    //     {diets?.map((diet) => (
    //       <li key={diet}>{diet.charAt(0).toUpperCase() + diet.slice(1)}</li>
    //     ))}
    //   </div>
    // </div>
    <div className="card">
      <Link to={`/recipes/${id}`}>
        <img src={img} alt="xd" />
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
