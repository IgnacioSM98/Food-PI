import React from "react";
import img from "../../../assets/images/img.png";
import { Link } from "react-router-dom";
import SearchNavBar from "../SearchNavBar";
import "./index.css";

export default function NavBar() {
  return (
    <div className="NavBar">
      <Link to="/">
        <img src={img} alt="sth" />
      </Link>

      <SearchNavBar />
    </div>
  );
}
