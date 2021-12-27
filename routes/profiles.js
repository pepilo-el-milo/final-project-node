const {Router} = require('express')
const {check, param} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT, verificarJWT } = require('../middlewares/validar-jwt')
const { getProfile, followUser, unfollowUser } = require('../services/profiles')
const router = Router()

const paramValidation = param('username').not().isEmpty()

router.get('/:username', [paramValidation, validarCampos, verificarJWT], getProfile)
router.post('/:username/follow', [paramValidation, validarCampos,validarJWT], followUser)
router.delete('/:username/follow', [paramValidation, validarCampos,validarJWT], unfollowUser)

module.exports = router