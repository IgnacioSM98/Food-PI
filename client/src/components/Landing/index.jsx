import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/img.png";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../../actions";
import "./index.css";

export default function Landing() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);

  useEffect(() => {
    localStorage.removeItem("foods");
    dispatch(getFoods());
  }, []);

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

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
