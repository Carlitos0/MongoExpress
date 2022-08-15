const router = require("express").Router();
const {
  renderAllAutores,
  renderAddAutores,
  createAutor,
  deleteAutor,
  updateAutor,
  renderEditForm,
} = require("../controllers/autores.controller");

router.get("/autores", renderAllAutores);

router.get("/autores/add",renderAddAutores);
router.post("/autores/add",createAutor);


router.delete("/autores/delete/:id",deleteAutor)

router.get("/autores/update/:id",renderEditForm)
router.put("/autores/update/:id",updateAutor);

module.exports = router;
