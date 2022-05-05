import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { saveNewRecipe } from "../../Redux/Actions/actions";
import Types from "./Types";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./index.css";

const initialForm = {
  image: "",
  name: "",
  resumen: "",
  score: "",
  healthyLvl: "",
  instructions: "",
  diets: [],
};

const FormCreate = () => {
  const [form, setForm] = useState(initialForm);
  const { register, handleSubmit, formState } = useForm();

  const recipeCreated = useSelector((state) => state.recipeCreated);

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

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("image", form.image);
    formData.append("name", form.name);
    formData.append("resumen", form.resumen);
    formData.append("score", form.score);
    formData.append("healthyLvl", form.healthyLvl);
    formData.append("instructions", form.instructions);
    formData.append("diets", form.diets);

    axios
      .post("http://localhost:3001/createFood", formData)
      .then((res) => console.log(res));

    // axios
    //   .post("http://localhost:3001/createFood", form, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    //     },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // setForm(initialForm);
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <form
            className="form_items"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="group">
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setForm({
                    ...form,
                    [e.target.name]: e.target.files[0],
                  })
                }
              />
            </div>

            <div className="group">
              <input
                type="text"
                name="name"
                placeholder="Mi receta favorita"
                value={form.name}
                {...register("name", { required: true, minLength: 4 })}
                onChange={handleChange}
              />
              {formState?.errors?.name && <span>Name is invalid</span>}
            </div>
            <div className="group">
              <textarea
                name="resumen"
                cols="30"
                rows="4"
                placeholder="Describe lo asombrosa que es tu receta"
                value={form.resumen}
                {...register("resumen")}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="group">
              <input
                type="number"
                name="score"
                id="score"
                placeholder="Puntuación"
                value={form.score}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <input
                type="number"
                name="healthyLvl"
                id="healthyLvl"
                placeholder="¿Qué tan saludable es?"
                {...register("healthyLvl")}
                value={form.healthyLvl}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <textarea
                name="instructions"
                id="instructions"
                cols="30"
                rows="5"
                placeholder="Cuéntanos cómo se prepara, todos queremos saber"
                value={form.instructions}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="types_group">
              <Types
                handleRemoveType={handleRemoveType}
                handleAddType={handleAddType}
                diets={form.diets}
              />
            </div>

            <button type="submit" className="btn">
              Guardar
            </button>
          </form>
        </div>
      </div>

      {/* {recipeCreated && Object.keys(recipeCreated).length > 0 && (
          <div className="msg">
            <h5>Receta creada</h5>
            <div>
              <span>{recipeCreated.name}</span>
            </div>
          </div>
        )} */}
    </>
  );
};

export default FormCreate;
