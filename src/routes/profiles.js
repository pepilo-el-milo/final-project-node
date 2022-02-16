const {Router} = require("express");
const {param} = require("express-validator");
const {validarCampos, validarJWT, verificarJWT, findProfileByUser} = require("../middlewares/index");
const { getProfile, followUser, unfollowUser } = require("../services/profiles");
const router = Router();

const paramValidation = param("username").not().isEmpty();

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *          type: object
 *          properties:
 *              profile:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      bio:
 *                          type: string
 *                      image:
 *                          type: string
 *                      following:
 *                          type: boolean
 */

/**
 * @swagger
 * /api/profiles/{username}:
 *    get:
 *      summary: Returns user profile information
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            type: string
 *      responses:
 *        200:
 *          description: User Profile Information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Profile'
 *        400:
 *          $ref: '#/components/responses/400'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/:username", [paramValidation, validarCampos,findProfileByUser, verificarJWT], getProfile);
/**
 * @swagger
 * /api/profiles/{username}/follow:
 *    post:
 *      summary: Follows user
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: User Profile Information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Profile'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post("/:username/follow", [paramValidation, validarCampos,findProfileByUser,validarJWT], followUser);
/**
 * @swagger
 * /api/profiles/{username}/follow:
 *    delete:
 *      summary: Unfollows user
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *          - in: header
 *            name: Authorization
 *            description: JWT Token
 *            required: true
 *            type: string
 *      responses:
 *        200:
 *          description: User Profile Information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Profile'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.delete("/:username/follow", [paramValidation, validarCampos,findProfileByUser,validarJWT], unfollowUser);

module.exports = router;