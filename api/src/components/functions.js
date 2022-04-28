const axios = require("axios");
const { Recipe, Diet } = require("../db");

const getAllRecipes = async () => {
  try {
    let recipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=30`
    );

    recipes = recipes.data.results.map((res) => ({
      id: res.id,
      name: res.title,
      img: res.image,
      score: res.spoonacularScore,
      diets: res.diets,
    }));

    let recipesDB = await Recipe.findAll();

    recipesDB = recipesDB.map((recipe) => ({
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      score: recipe.dataValues.score,
    }));

    recipes = recipes.concat(recipesDB);

    return recipes;
  } catch (error) {
    console.log(error);
  }
};

const getRecipesDetails = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    );

    return {
      id: data.id,
      name: data.title,
      img: data.image,
      summary: data.summary,
      score: data.spoonacularScore,
      healthScore: data.healthScore,
      instructions: data.instructions,
      dishTypes: data.dishTypes,
      diets: data.diets,
    };
  } catch (error) {
    console.log(error);
  }
};

const getTypes = async (types) => {
  // const TypesOfDiets = foods?.map((food) => {
  //   return food.diets?.map((diet) => {
  //     return diet.charAt(0).toUpperCase() + diet.slice(1);
  //   });/
  // });
  const dietsAux = types.split(",");

  const TypesOfDiets = dietsAux.map((diet) => ({
    name: diet,
  }));
  console.log(TypesOfDiets, "xdxd");
  // const TypesOfDiets = [
  //   { name: "Gluten free" },
  //   { name: "Ketogenic" },
  //   { name: "Vegetarian" },
  //   { name: "Lacto-Vegetarian" },
  //   { name: "Ovo-Vegetarian" },
  //   { name: "Vegan" },
  //   { name: "Pescetarian" },
  //   { name: "Paleo" },
  //   { name: "Primal" },
  //   { name: "Low FODMAP" },
  //   { name: "Whole30" },
  // ];

  try {
    if (TypesOfDiets) {
      const listaDietas = await Diet.bulkCreate(TypesOfDiets, {
        returning: true,
      });
      return listaDietas;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipesDetails,
  getTypes,
};
