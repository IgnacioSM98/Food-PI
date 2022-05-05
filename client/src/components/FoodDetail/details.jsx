import React from "react";
import parse from "html-react-parser";

export default function Details({ foodDetail }) {
  return (
    <>
      {console.log(foodDetail, "tehee")}
      <img src={foodDetail.img} alt="imagen receta" className="back" />
      <div className="glass">
        <div className="details">
          <div className="head">
            <div>
              <img src={foodDetail.img} alt={foodDetail.img} />
            </div>
            <div>
              <h2>{foodDetail.name}</h2>
              <div className="attributes">
                <h4>
                  score <span>{foodDetail.score}</span>
                </h4>
                <h4>
                  healthyscore <span>{foodDetail.healthScore}</span>
                </h4>
                <h5>Diets: {foodDetail.diets?.join(", ")}</h5>
                {foodDetail.dishTypes?.length && (
                  <h4>Dish Types: {foodDetail.dishTypes?.join(", ")}</h4>
                )}
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              <h3>Sumary</h3>
              {parse(`${foodDetail.summary}`)}
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
