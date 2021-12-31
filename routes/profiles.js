const {Router} = require("express");
const {param} = require("express-validator");
const {validarCampos, validarJWT, verificarJWT, findProfileByUser} = require("../middlewares/index");
const { getProfile, followUser, unfollowUser } = require("../services/profiles");
const router = Router();

const paramValidation = param("username").not().isEmpty();

router.get("/:username", [paramValidation, validarCampos,findProfileByUser, verificarJWT], getProfile);
router.post("/:username/follow", [paramValidation, validarCampos,findProfileByUser,validarJWT], followUser);
router.delete("/:username/follow", [paramValidation, validarCampos,findProfileByUser,validarJWT], unfollowUser);

module.exports = router;