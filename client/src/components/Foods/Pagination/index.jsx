import React from "react";

export default function Pagination({ pages, setPageSelected }) {
  const handleOnClick = (e) => {
    e.preventDefault();

    setPageSelected(e.target.value);
  };
  const getArray = (pages) => {
    let i = 0;
    let arrayAux = [];

    do {
      i = i + 1;

      arrayAux.push(i);
    } while (i < pages);

    return arrayAux;
  };

  return (
    <div>
      {getArray(pages).map((page) => (
        <button key={page} onClick={(e) => handleOnClick(e)} value={page}>
          {page}
        </button>
      ))}
    </div>
  );
}
