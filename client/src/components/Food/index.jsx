import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

import image from "../../Images/c485acf875e4fd07b76dccac4863d706.png";

export default function Food({ id, name, score, img, diets }) {
  return (
    <div className="card">
      <Link to={`/recipes/${id}`}>
        {console.log(img === image, image, img, "awota")}
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
