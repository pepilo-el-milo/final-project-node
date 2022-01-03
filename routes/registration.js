const {Router} = require("express");
const {authMW, registrationMW} = require("../middlewares/constantes");
const { validarCampos } = require("../middlewares/validar-campos");
const { login, createUser } = require("../services/auth");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *     UserCreate:
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
 */

/**
 * @swagger
 * /api/users/login:
 *    post:
 *      summary: Creates a user session
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginBody'
 *      responses:
 *        200:
 *          description: User information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *        422:
 *          $ref: '#/components/responses/422'
 *        400:
 *          $ref: '#/components/responses/400'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/login",[...authMW,validarCampos],login);
/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: Creates a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserCreate'
 *      responses:
 *        201:
 *          description: User information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *        422:
 *          $ref: '#/components/responses/422'
 *        400:
 *          $ref: '#/components/responses/400'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/",[...registrationMW,validarCampos],createUser);


module.exports = router;