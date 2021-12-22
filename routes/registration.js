const {Router} = require('express')
const {authMW, registrationMW} = require('../middlewares/constantes')
const { validarCampos } = require('../middlewares/validar-campos')
const { login, createUser } = require('../services/auth')

const router = Router()

router.post('/login',[...authMW,validarCampos],login)
router.post('/',[...registrationMW,validarCampos],createUser)


module.exports = router