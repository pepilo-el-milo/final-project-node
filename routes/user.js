const {Router} = require("express");
const { userInfo } = require("../middlewares/constantes");
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const { getUser, updateUser } = require("../services/users");

const router = Router();

router.get("/", validarJWT , getUser);
router.put("/", [userInfo, validarCampos, validarJWT], updateUser);

module.exports = router;