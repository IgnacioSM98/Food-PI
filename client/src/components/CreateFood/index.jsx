import React, { useState } from "react";
import axios from "axios";

export default function CreateFood() {
  const [formV, setFormV] = useState({});

  const handleOnSubmit = () => {
    console.log(formV, "aca");
    axios
      .post("http://localhost:3001/createFood", formV, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        },
      })
      .then((res) => console.log(res, "plsxdxdxd"))
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e) => {
    setFormV({ ...formV, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formV.name}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Resumen del plato:
          <input
            type="text"
            name="resumen"
            value={formV.resumen}
            onChange={handleOnChange}
          />
        </label>

        <label>
          Puntuacion:
          <input
            type="text"
            name="score"
            value={formV.score}
            onChange={handleOnChange}
          />
        </label>

        <label>
          Nivel de saludable:
          <input
            type="text"
            name="healthyLvl"
            value={formV.healthyLvl}
            onChange={handleOnChange}
          />
        </label>

        <label>
          Paso a Paso:
          <input type="text" name="name" />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
