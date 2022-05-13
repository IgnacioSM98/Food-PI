import React, { useEffect, useState } from "react";
import Types from "./Types";
import { useForm } from "react-hook-form";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { createFood } from "../../actions";
import { getFoods } from "../../actions";

const initialForm = {
  image: "",
  name: "",
  resumen: "",
  score: "",
  healthyLvl: "",
  instructions: "",
  diets: [],
};

const msg = {
  image: "Se debe ingresar una foto",
  name: "Se debe completar el nombre",
  resumen: "Se debe completar con una descripcion",
  score: "El puntaje es obligatorio",
  healthyLvl: "La calificacion es obligatoria",
  instructions: "Las instrucciones son obligatorias",
};

export const validate = (value, name) => {
  if (!value) return msg[name];

  if (name === "score" && value > 100) {
    return "El puntaje no debe ser mayor a 100";
  }

  if (name === "healthyLvl" && value > 100) {
    return "La calificación no puede ser mayor a 100";
  }

  if (name === "tipos" && value === "default") {
    return "Seleccione al menos una dieta";
  }
};

const FormCreate = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState();

  const recipeCreated = useSelector((state) => state.recipeCreated);
  const foods = useSelector((state) => state.foods);
  const [showElement, setShowElement] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (foods.length === 0) dispatch(getFoods());
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveType = (id) => {
    setForm({
      ...form,
      diets: form.diets.filter((diet) => diet.id !== id),
    });
  };

  const handleAddType = (obj) => {
    const index = form.diets.map((diet) => diet.id).indexOf(obj.id);
    if (index < 0) {
      setForm({
        ...form,
        diets: [...form.diets, obj],
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let flag = "";

    for (const prop in form) {
      flag = validate(form[prop], prop);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [prop]: validate(form[prop], prop),
      }));
    }
    const formData = new FormData();

    if (!flag) {
      formData.append("file", form.image);
      formData.append("upload_preset", "preset");
      dispatch(createFood(formData, form));
      setShowElement(true);
    }
  };

  useEffect(() => {
    if (Object.keys(recipeCreated).length > 0) {
      localStorage.setItem("foods", JSON.stringify(foods));
    }

    setTimeout(function () {
      setShowElement(false);
    }, 3000);
  }, [recipeCreated]);

  return (
    <>
      <div className="container">
        <div className="section">
          <form className="form_items" onSubmit={onSubmit}>
            <div className="group">
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.files[0],
                  });
                }}
                onBlur={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.files[0], e.target.name),
                  }));
                }}
              />
            </div>
            <p className="errors">{errors?.image}</p>

            <div className="group">
              <input
                type="text"
                name="name"
                placeholder="Mi receta favorita"
                onChange={handleChange}
                onBlur={(e) =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.value, e.target.name),
                  }))
                }
              />
            </div>
            <p className="errors">{errors?.name}</p>

            <div className="group">
              <textarea
                name="resumen"
                cols="30"
                rows="4"
                placeholder="Describe lo asombrosa que es tu receta"
                onChange={handleChange}
                onBlur={(e) =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.value, e.target.name),
                  }))
                }
              ></textarea>
            </div>
            <p className="errors">{errors?.resumen}</p>

            <div className="group">
              <input
                type="number"
                name="score"
                placeholder="Puntuación"
                onChange={handleChange}
                onBlur={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.value, e.target.name),
                  }));
                }}
              />
            </div>
            <p className="errors">{errors?.score}</p>

            <div className="group">
              <input
                type="number"
                name="healthyLvl"
                placeholder="¿Qué tan saludable es?"
                onChange={handleChange}
                onBlur={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.value, e.target.name),
                  }));
                }}
              />
            </div>
            <p className="errors">{errors?.healthyLvl}</p>

            <div className="group">
              <textarea
                name="instructions"
                cols="30"
                rows="5"
                placeholder="Contanos cómo se prepara"
                onChange={handleChange}
                onBlur={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: validate(e.target.value, e.target.name),
                  }));
                }}
              ></textarea>
            </div>
            <p className="errors">{errors?.instructions}</p>

            <div className="types_group">
              <Types
                handleRemoveType={handleRemoveType}
                handleAddType={handleAddType}
                diets={form.diets}
                onChange={handleChange}
                setErrors={setErrors}
              />
            </div>
            <p className="errors">{errors?.tipos}</p>

            <button type="submit" className="btn">
              Guardar
            </button>
          </form>
        </div>
      </div>
      {showElement && Object.keys(recipeCreated).length > 0 && (
        <div className="msg">
          <h5>Receta creada</h5>
          <div>
            <span>{recipeCreated.name}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCreate;
