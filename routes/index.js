const {Router} = require("express");
const authRouter = require("./registration");
const userRouter = require("./user");
const profilesRouter = require("./profiles");
const articlesRouter = require("./articles");
const { getTags } = require("../services/tags");

const router = Router();

/**
 * @swagger
 * components:
 *   responses:
 *     400:
 *       description: Bad Request
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *     401:
 *       description: Token not valid
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *     403:
 *       description: Forbidden
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *     422:
 *       description: Unprocessable Entity
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erros:
 *                   type: array
 *                   items:
 *                      type: string
 *     500:
 *       description: Internal Server Error
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 errors:
 *                   type: object
 */

router.use("/users", authRouter);
router.use("/user", userRouter);
router.use("/profiles", profilesRouter);
router.use("/articles", articlesRouter);

/**
 * @swagger
 * /api/tags:
 *    get:
 *      summary: Returns a list of tags
 *      responses:
 *        200:
 *          description: User Profile Information
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     tags:
 *                         type: array
 *                         items:
 *                             type: string
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get("/tags", getTags);
router.get("*", (req, res) => {
    res.status(404).json({
        msg:"Error - URL not found"
    });
});

module.exports = router;