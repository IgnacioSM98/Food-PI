import React from "react";
import { useState } from "react";
import "./index.css";

export default function Dropdown({ selected, setSelected, foods }) {
  const [isActive, setActive] = useState(false);
  const optionsAux = foods?.map((food) => {
    return food.diets?.map((diet) => {
      return diet.charAt(0).toUpperCase() + diet.slice(1);
    });
  });

  const options = [...new Set(optionsAux.flat())];

  return (
    <div>
      <div className="dropdown">
        <div
          className="dropdown-btn"
          onClick={() => {
            setActive(!isActive);
          }}
        >
          {selected || "afa"}
        </div>
        {isActive && (
          <div className="dropdown-content">
            {options?.map((option) => (
              <div
                className="dropdown-item"
                onClick={() => {
                  setSelected(option);
                  setActive(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
