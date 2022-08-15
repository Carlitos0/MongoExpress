const router = require("express").Router();

const {InicialPage,renderRegister,ValidateSingin,signup} = require("../controllers/index.controller");

router.get("/",InicialPage);

router.post("/login",signup)

router.get("/register", renderRegister);
router.post("/register", ValidateSingin)

module.exports = router;