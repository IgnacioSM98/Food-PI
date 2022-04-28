import React from "react";
import { Link } from "react-router-dom";

export default function CreateFood() {
  return (
    <div>
      <Link to="/createFood">
        <button>Crea pa</button>
      </Link>
    </div>
  );
}
