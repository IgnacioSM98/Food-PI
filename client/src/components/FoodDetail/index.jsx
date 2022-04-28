import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFoodDetail } from "../../actions";
import { connect } from "react-redux";
import "./index.css";
import parse from "html-react-parser";

function FoodDetail(props) {
  const { id } = useParams();

  useEffect(() => {
    props.getFoodDetail(id);
  }, []);

  return (
    <>
      <img src={props.foodDetail.img} alt="imagen receta" className="back" />
      <section className="glass">
        {/* <Nav /> */}
        <div className="details">
          <div className="head">
            <div>
              <img src={props.foodDetail.img} alt={props.foodDetail.img} />
            </div>
            <div>
              <h2>{props.foodDetail.name}</h2>
              <div className="attributes">
                <h4>
                  score <span>{props.foodDetail.score}</span>
                </h4>
                <h4>
                  healthyscore <span>{props.foodDetail.healthScore}</span>
                </h4>
                <h5>Diets: {props.foodDetail.diets?.join(", ")}</h5>
                {props.foodDetail.dishTypes?.length && (
                  <h4>Dish Types: {props.foodDetail.dishTypes?.join(", ")}</h4>
                )}
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              <h3>Sumary</h3>
              {parse(`${props.foodDetail.summary}`)}
            </div>
            <div>
              <h3>Instructions</h3>
              {props.foodDetail.instructions
                ? parse(`${props.foodDetail.instructions}`)
                : "No instructions"}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function mapStateToProps(state) {
  return {
    foodDetail: state.foodDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFoodDetail: (id) => dispatch(getFoodDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
