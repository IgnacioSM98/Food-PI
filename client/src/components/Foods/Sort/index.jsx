import React from "react";

export default function Sort({ setSort }) {
  const handleOnChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div
      onChange={(e) => {
        handleOnChange(e);
      }}
    >
      <input type="radio" value="A-Z" name="sort" /> A-Z
      <input type="radio" value="Z-A" name="sort" /> Z-A
      <input type="radio" value="Highest SpoonScore" name="sort" /> Highest
      SpoonScore
      <input type="radio" value="Lowest SpoonScore" name="sort" /> Lowest
      SpoonScore
    </div>
  );
}
