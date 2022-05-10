import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Foods from "./components/Foods";
import CreateFood from "./components/CreateFood";
import FoodDetail from "./components/FoodDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipes" element={<Foods />} />
          <Route path="/createFood" element={<CreateFood />} />
          <Route path="/recipes/:id" element={<FoodDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
