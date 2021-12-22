const {Router} = require('express')
const {createCommentMW} = require('../middlewares/constantes')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/',(req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.post('/', [createCommentMW, validarJWT], (req, res) => {
    return res.status(201).json({
        msg:'Ok'
    })
})
router.delete('/:id',validarJWT, (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })  
})

module.exports = router