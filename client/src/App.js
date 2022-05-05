import "./App.css";
import { Routes, Route } from "react-router";
import Landing from "./components/Landing";
import Foods from "./components/Foods";
import CreateFood from "./components/CreateFood";
import FoodDetail from "./components/FoodDetail";
import { getFoods } from "./actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  const filteredFoods = useSelector((state) => state.filteredFoods);

  // useEffect(() => {
  //   dispatch(getFoods());
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Foods />} />
        <Route path="/createFood" element={<CreateFood />} />
        <Route path="/recipes/:id" element={<FoodDetail />} />
      </Routes>
    </div>
  );
}

export default App;
