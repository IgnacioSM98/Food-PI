import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../index";
import { getTypes } from "../../../actions";

export default function Types({
  handleRemoveType,
  handleAddType,
  diets,
  setErrors,
}) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleChange = (e) => {
    const id = parseInt(e.target.value);
    const obj = types.find((type) => type.id === id);

    handleAddType(obj);
  };
  return (
    <>
      <div className="types_select">
        <select
          name="tipos"
          defaultValue="default"
          onChange={handleChange}
          onBlur={(e) =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              [e.target.name]: validate(e.target.value, e.target.name),
            }))
          }
        >
          <option value="default" disabled>
            Tipos de Dieta
          </option>
          {types.length > 0 ? (
            types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))
          ) : (
            <option>Loading....</option>
          )}
        </select>
      </div>
      <div>
        <ul>
          {diets.map((dieta) => (
            <li key={dieta.id}>
              <span>{dieta.name}</span>
              <button onClick={() => handleRemoveType(dieta.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
