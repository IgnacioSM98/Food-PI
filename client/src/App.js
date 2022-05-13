import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Foods from "./components/Foods";
import CreateFood from "./components/CreateFood";
import FoodDetail from "./components/FoodDetail";

function App() {
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
