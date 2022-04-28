const {
  getAllRecipes,
  getRecipesDetails,
  getTypes,
} = require("../components/functions");
const { Router } = require("express");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  try {
    const todasRecetas = await getAllRecipes();

    res.json(todasRecetas);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipesDetails = await getRecipesDetails(req.params.id);

    res.json(recipesDetails);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.get("/types", async (req, res) => {
  const types = req.query.types;
  try {
    let dietasList = await Diet.findAll();

    if (dietasList.length === 0) {
      dietasList = await getTypes(types);
    }
    console.log(dietasList, pls);
    res.json(dietasList);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.post("/createFood", async (req, res) => {
  const { name, resumen, score, healthyLvl } = req.body;

  console.log(req.body, "post back");
  await Recipe.create({ name, resumen, score, healthyLvl });
});

module.exports = router;
