const {Router} = require("express");
const {createCommentMW} = require("../middlewares/constantes");
const { validarJWT, validarCampos, verificarJWT } = require("../middlewares/index");
const { getComments, addComment, deleteComment } = require("../services/comments");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *          type: object
 *          properties:
 *            id:
 *                type: integer
 *            createdAt:
 *                type: string
 *            updatedAt:
 *                type: string
 *            body:
 *                type: string
 *            author:
 *                $ref: '#/components/schemas/Profile'
 *     CommentBody:
 *          type: object
 *          properties:
 *              comment:
 *                  type: object
 *                  properties:
 *                      body:
 *                          type: string
 *                      
 */

/**
 * @swagger
 * /api/articles/{slug}/comments/:
 *    get:
 *      summary: Returns a list of comments from an article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            type: string
 *      responses:
 *        200:
 *          description: All comments
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      comments:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comment'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/", verificarJWT,getComments);

/**
 * @swagger
 * /api/articles/{slug}/comments/:
 *    post:
 *      summary: Creates a single comment of an article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CommentBody'
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      comment:
 *                          $ref: '#/components/schemas/Comment'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/", [createCommentMW, validarJWT, validarCampos], addComment);

/**
 * @swagger
 * /api/articles/{slug}/comments/{id}:
 *    delete:
 *      summary: Deletes a single comment of an article
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: string
 *            required: true
 *            description: Article title slug
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Comment Id
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: Created
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      msg:
 *                          type: string
 *        400:
 *          $ref: '#/components/responses/400'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.delete("/:id",validarJWT, deleteComment);

module.exports = router;