const {Router} = require("express");
const { userInfo } = require("../middlewares/constantes");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getUser, updateUser } = require("../services/users");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: name of the user
 *             email:
 *               type: string
 *               description: email of the user
 *             token:
 *               type: string
 *               description: password of the user
 *             bio:
 *               type: string
 *               description: bio of the user
 *             image:
 *               type: string
 *               description: profile pic of the user
 *     UserBody:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: name of the user
 *             email:
 *               type: string
 *               description: email of the user
 *             password:
 *               type: string
 *               description: password of the user
 *             bio:
 *               type: string
 *               description: bio of the user
 *             image:
 *               type: string
 *               description: profile pic of the user
 */

/**
 * @swagger
 * /api/user:
 *    get:
 *      summary: Returns information of current user
 *      responses:
 *        200:
 *          description: User information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *        401:
 *          $ref: '#/components/responses/401'
 *        422:
 *          $ref: '#/components/responses/422'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/", validarJWT , getUser);
/**
 * @swagger
 * /api/user/{id}:
 *    put:
 *      summary: Updates user information
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: User id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserBody'
 *      responses:
 *        200:
 *          description: User information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *        401:
 *          $ref: '#/components/responses/401'
 *        422:
 *          $ref: '#/components/responses/422'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.put("/", [userInfo, validarCampos, validarJWT], updateUser);

module.exports = router;