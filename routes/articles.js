const {Router} = require("express");
const { validarJWT, verificarJWT, findArticleBySlug, validarCampos } = require("../middlewares/index");
const { createArticleMW, articleInfo} = require("../middlewares/constantes");
const commentRouter = require("./comments");
const { createArticle, getArticle, updateArticle, deleteArticle, getArticles, favoriteArticle, unfavoriteArticle, getFeed } = require("../services/articles");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *          type: object
 *          properties:
 *              slug:
 *                  type: string
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              body:
 *                  type: string
 *              tagList:
 *                  type: array
 *                  items:
 *                      type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              favorited:
 *                  type: boolean
 *              favoritesCount:
 *                  type: integer
 *              author:
 *                  $ref: '#/components/schemas/Profile'
 *     ArticleBody:
 *          type: object
 *          properties:
 *              article:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      body:
 *                          type: string
 *                      tagList:
 *                          type: array
 *                          items:
 *                              type: string 
 *     ArticleUpdate:
 *          type: object
 *          properties:
 *              article:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      body:
 *                          type: string 
 *                      
 */

/**
 * @swagger
 * /api/articles/:
 *    get:
 *      summary: Returns a list of all articles
 *      parameters:
 *          - in: query
 *            name: tag
 *            schema:
 *              type: string
 *            description: Article tag
 *          - in: query
 *            name: author
 *            schema:
 *              type: string
 *            description: Article author
 *          - in: query
 *            name: favorited
 *            schema:
 *              type: string
 *            description: Favorite articles from user
 *          - in: query
 *            name: limit
 *            schema:
 *              type: number
 *            description: List max count
 *          - in: query
 *            name: offset
 *            schema:
 *              type: string
 *            description: Search start point
 *      responses:
 *        200:
 *          description: All articles by filter
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      articles:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Article'
 *                      articlesCount:
 *                          type: integer
 *        400:
 *          $ref: '#/components/responses/400'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/", verificarJWT, getArticles);
/**
 * @swagger
 * /api/articles/feed:
 *    get:
 *      summary: Returns a list of articles from current user's following users
 *      responses:
 *        200:
 *          description: Articles by feed
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      articles:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Article'
 *                      articlesCount:
 *                          type: integer
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/feed", validarJWT , getFeed);
/**
 * @swagger
 * /api/articles/{slug}:
 *    get:
 *      summary: Returns article information
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *      responses:
 *        200:
 *          description: Article
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      article:
 *                          $ref: '#/components/schemas/Article'
 *        422:
 *          $ref: '#/components/responses/422'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/:slug", [verificarJWT, findArticleBySlug] , getArticle);
/**
 * @swagger
 * /api/articles/:
 *    post:
 *      summary: Creates article
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArticleBody'
 *      responses:
 *        200:
 *          description: Article created
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      article:
 *                          $ref: '#/components/schemas/Article'
 *        401:
 *          $ref: '#/components/responses/401'
 *        422:
 *          $ref: '#/components/responses/422'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/", [createArticleMW, validarCampos, validarJWT] , createArticle);
/**
 * @swagger
 * /api/articles/{slug}:
 *    put:
 *      summary: Updates article information
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArticleUpdate'
 *      responses:
 *        200:
 *          description: Article updated
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      article:
 *                          $ref: '#/components/schemas/Article'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        422:
 *          $ref: '#/components/responses/422'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.put("/:slug", [articleInfo, validarCampos,  validarJWT, findArticleBySlug] , updateArticle);
/**
 * @swagger
 * /api/articles/{slug}:
 *    delete:
 *      summary: Deletes article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *      responses:
 *        200:
 *          description: Article Deleted
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      msg:
 *                        type: string
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.delete("/:slug", [validarJWT,findArticleBySlug], deleteArticle);
/**
 * @swagger
 * /api/articles/{slug}/favorite:
 *    post:
 *      summary: Favorites article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *      responses:
 *        200:
 *          description: Article favorited
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      article:
 *                          $ref: '#/components/schemas/Article'
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/:slug/favorite", [validarJWT,findArticleBySlug], favoriteArticle);
/**
 * @swagger
 * /api/articles/{slug}/favorite:
 *    delete:
 *      summary: Unfavorites article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *      responses:
 *        200:
 *          description: Article unfavorited
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      msg:
 *                         type: string
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.delete("/:slug/favorite", [validarJWT, findArticleBySlug], unfavoriteArticle);
router.use("/:slug/comments", findArticleBySlug, commentRouter);

module.exports = router;