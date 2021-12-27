const {Router} = require('express')
const { validarJWT, verificarJWT, findArticleBySlug } = require('../middlewares/index')
const { createArticleMW, articleInfo} = require('../middlewares/constantes')
const commentRouter = require('./comments')
const { createArticle, getArticle, updateArticle, deleteArticle, getArticles, favoriteArticle, unfavoriteArticle, getFeed } = require('../services/articles')

const router = Router()

router.get('/', verificarJWT, getArticles)
router.get('/feed', validarJWT , getFeed)
router.get('/:slug', [verificarJWT, findArticleBySlug] , getArticle)
router.post('/', [createArticleMW, validarJWT] , createArticle)
router.put('/:slug', [articleInfo,  validarJWT, findArticleBySlug] , updateArticle)
router.delete('/:slug', [validarJWT,findArticleBySlug], deleteArticle)
router.post('/:slug/favorite', [validarJWT,findArticleBySlug], favoriteArticle)
router.delete('/:slug/favorite', [validarJWT, findArticleBySlug], unfavoriteArticle)
router.use('/:slug/comments', findArticleBySlug, commentRouter)

module.exports = router