const {Router} = require('express')
const {check, param} = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

const paramValidation = param('username').not().isEmpty()

router.get('/:username', paramValidation, (req,res)=>{
    return res.status(200).json({
        msg:'Ok'
    })
})
router.post('/:username/follow', [paramValidation,validarJWT], (req,res)=>{
    return res.status(200).json({
        msg:'Ok'
    })
})
router.delete('/:username/follow', [paramValidation,validarJWT], (req,res)=>{
    return res.status(200).json({
        msg:'Ok'
    })
})

module.exports = router