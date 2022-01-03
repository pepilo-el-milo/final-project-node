const {check} = require("express-validator");

/**
 * @constant
 * @type {ValidationChain}
 */
const userInfo = check("user", "User information is required").not().isEmpty();

/**
 * @constant
 * @type {ValidationChain[]}
 */
const commonMW = [
    userInfo,
    check("user.email", "Email is required").not().isEmpty(),
    check("user.email", "Email format is incorrect").isEmail(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const authMW = [
    ...commonMW,
    check("user.password", "Password is required").not().isEmpty(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const registrationMW = [
    ...commonMW,
    check("user.username", "Username is required").not().isEmpty(),
    check("user.password", "Password is required").not().isEmpty(),
];

/**
 * @constant
 * @type {ValidationChain}
 */
const articleInfo = check("article", "Article information is required").not().isEmpty();

/**
 * @constant
 * @type {ValidationChain[]}
 */
const createArticleMW = [
    articleInfo,
    check("article.title", "The article title is required").not().isEmpty(),
    check("article.description", "The article description is required").not().isEmpty(),
    check("article.body", "The article body is required").not().isEmpty(),
    check("article.tagList", "The tags received are not a list").isArray(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const createCommentMW = [
    check("comment", "Comment information is required").not().isEmpty(),
    check("comment.body", "The comment body is required").not().isEmpty(),
];

module.exports = {
    authMW,
    registrationMW,
    userInfo,
    articleInfo,
    createArticleMW,
    createCommentMW
};