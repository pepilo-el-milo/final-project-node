const {Router} = require('express')
const authRouter = require('./registration')
const userRouter = require('./user')
const profilesRouter = require('./profiles')
const articlesRouter = require('./articles')

const router = Router()

router.use('/users', authRouter)
router.use('/user', userRouter)
router.use('/profiles', profilesRouter)
router.use('/articles', articlesRouter)
router.get('/tags', [], () => {})
router.get('*', (req, res) => {
    res.status(404).json({
        msg:"Error - URL not found"
    })
})

module.exports = router