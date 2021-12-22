const {Router} = require('express')
const {updateUser} = require('../middlewares/constantes')
const {validarJWT} = require('../middlewares/validar-jwt')
const { getUser } = require('../services/users')

const router = Router()

router.get('/', validarJWT , getUser)
router.put('/', [updateUser, validarJWT], () => {})

module.exports = router