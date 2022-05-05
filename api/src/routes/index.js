const {
  getAllRecipes,
  getRecipesDetails,
  getTypes,
} = require("../components/functions");
const { Router } = require("express");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const multer = require("multer");
const upload = multer({
  dest: "C:/Users/ignac/Desktop/PI-Food-main/client/src/Images",
});
const fs = require("fs");
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
    res.send(dietasList);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.post("/createFood", upload.single("image"), async (req, res) => {
  const {
    file: { originalname },
    body: { name, resumen, score, healthyLvl, instructions },
  } = req;
  console.log(req.file, "req file");

  const fileType = req.file.mimetype.split("/")[1];
  const newFileName = req.file.filename + "." + fileType;

  fs.rename(
    `C:/Users/ignac/Desktop/PI-Food-main/client/src/Images/${req.file.filename}`,
    `C:/Users/ignac/Desktop/PI-Food-main/client/src/Images/${newFileName}`,
    function () {
      console.log("error");
    }
  );

  const recipeCreated = await Recipe.create({
    name,
    resumen,
    score,
    healthyLvl,
    instructions,
    image: `/static/media/${newFileName}`,
  });

  res.send(recipeCreated);
});

module.exports = router;
