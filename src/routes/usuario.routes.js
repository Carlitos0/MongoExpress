const router = require("express").Router();
const {
  renderAllUsers,
  addUser,
  renderEditForm,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios.controller");

router.get("/usuarios", renderAllUsers);

router.post("/usuarios/add", addUser);

router.get("/usuarios/update/:id", renderEditForm);
router.put("/usuarios/update/:id", updateUser);

router.delete("/usuarios/delete/:id", deleteUser);

module.exports = router;
