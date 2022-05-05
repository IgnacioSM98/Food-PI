import React from "react";
import CreateFood from "../../CreateFoodButton";

export default function SearchNavBar() {
  return (
    <div>
      <input type="text" placeholder="Busca" />
      <CreateFood />
    </div>
  );
}
