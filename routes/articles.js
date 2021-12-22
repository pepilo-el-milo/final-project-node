const {Router} = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { createArticleMW, articleInfo} = require('../middlewares/constantes')
const commentRouter = require('./comments')

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.get('/feed', validarJWT , (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.get('/:slug' , (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.post('/', [createArticleMW, validarJWT] , (req, res) => {
    return res.status(201).json({
        msg:'Ok'
    })
})
router.put('/:slug', [articleInfo, validarJWT] , (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.delete('/:slug', validarJWT, (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.post('/:slug/favorite', validarJWT, (req, res) => {
    return res.status(201).json({
        msg:'Ok'
    })
})
router.delete('/:slug/favorite', validarJWT, (req, res) => {
    return res.status(200).json({
        msg:'Ok'
    })
})
router.use('/:slug/comments', commentRouter)

module.exports = router