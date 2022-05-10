import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFoodDetail } from "../../actions";
import { connect } from "react-redux";
import "./index.css";
import Details from "./details";

function FoodDetail(props) {
  const { id } = useParams();

  useEffect(() => {
    props.getFoodDetail(id);
  }, []);

  return (
    <>
      {Object.entries(props.foodDetail).length !== 0 ? (
        <Details foodDetail={props.foodDetail} />
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
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
