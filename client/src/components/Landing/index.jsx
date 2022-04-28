import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/img.png";
import "./index.css";

export default function Landing() {
  return (
    <div className="container">
      <div className="landing">
        <img src={img} alt="recetas" />
        <Link to="/recipes" className="btn">
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
