const router = require("express").Router();
const {
  allLibros,
  autorId,
  addLibro,
  renderAutorForm,
  renderEditForm,
  deleteLibro,
  updateLibro
} = require("../controllers/libros.controller");

router.get("/libros", allLibros);

router.get("/autor/:id", autorId);

router.get("/libros/add", renderAutorForm);
router.post("/libros/add", addLibro);

router.get("/libros/update/:id", renderEditForm);
router.put("/libros/update/:id", updateLibro)

router.delete("/libros/delete/:id", deleteLibro);

module.exports = router;
