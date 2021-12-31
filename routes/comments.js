const {Router} = require("express");
const {createCommentMW} = require("../middlewares/constantes");
const { validarJWT, validarCampos, verificarJWT } = require("../middlewares/index");
const { getComments, addComment, deleteComment } = require("../services/comments");

const router = Router();

router.get("/", verificarJWT,getComments);
router.post("/", [createCommentMW, validarJWT, validarCampos], addComment);
router.delete("/:id",validarJWT, deleteComment);

module.exports = router;