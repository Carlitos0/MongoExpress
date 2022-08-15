const router = require("express").Router();

const {
  renderAllEditorials,
  renderAddEditorial,
  addEditorial,
  renderEditForm,
  updateEditorial,
  deleteEditorial,
} = require("../controllers/editorial.controller");

router.get("/editoriales", renderAllEditorials);

router.get("/editoriales/add",renderAddEditorial);
router.post("/editoriales/add", addEditorial);

router.get("/editoriales/update/:id",renderEditForm);
router.put("/editoriales/update/:id",updateEditorial);

router.delete("/editoriales/delete/:id",deleteEditorial);
module.exports = router;
