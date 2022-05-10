import React from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetDetail } from "../../actions";
import img from "../../assets/images/arrow.png";

export default function Details({ foodDetail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    dispatch(resetDetail());
    navigate("/recipes");
  };

  return (
    <>
      <img src={foodDetail.image} alt="imagen receta" className="back" />
      <div className="glass">
        <img className="goBack" src={img} onClick={handleGoBack} />

        <div className="details">
          <div className="head">
            <div>
              <img src={foodDetail.image} alt={foodDetail.image} />
            </div>
            <div>
              <h2>{foodDetail.name}</h2>
              <div className="attributes">
                <h4>
                  Score <span>{foodDetail.score}</span>
                </h4>
                <h4>
                  Healthyscore <span>{foodDetail.healthyLvl}</span>
                </h4>
                <h5>
                  Diets: {foodDetail.diets?.join(", ") || foodDetail.types}
                </h5>
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              <h3>Sumary</h3>
              {parse(`${foodDetail.resumen}`)}
            </div>
            <div>
              <h3>Instructions</h3>
              {foodDetail.instructions
                ? parse(`${foodDetail.instructions}`)
                : "No instructions"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
