const {check} = require("express-validator");

/**
 * @constant
 * @type {ValidationChain}
 */
const userInfo = check("user", "user-can't be empty").not().isEmpty();

/**
 * @constant
 * @type {ValidationChain[]}
 */
const commonMW = [
    userInfo,
    check("user.email", "email-can't be empty").not().isEmpty(),
    check("user.email", "email-format is incorrect").isEmail(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const authMW = [
    ...commonMW,
    check("user.password", "password-can't be empty").not().isEmpty(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const registrationMW = [
    ...commonMW,
    check("user.username", "username-can't be empty").not().isEmpty(),
    check("user.password", "username-can't be empty").not().isEmpty(),
];

/**
 * @constant
 * @type {ValidationChain}
 */
const articleInfo = check("article", "article-can't be empty").not().isEmpty();

/**
 * @constant
 * @type {ValidationChain[]}
 */
const createArticleMW = [
    articleInfo,
    check("article.title", "title-can't be empty").not().isEmpty(),
    check("article.description", "description-can't be empty").not().isEmpty(),
    check("article.body", "body-can't be empty").not().isEmpty(),
    check("article.tagList", "tagList-is not a list").isArray(),
];

/**
 * @constant
 * @type {ValidationChain[]}
 */
const createCommentMW = [
    check("comment", "comment-can't be empty").not().isEmpty(),
    check("comment.body", "body-can't be empty").not().isEmpty(),
];

module.exports = {
    authMW,
    registrationMW,
    userInfo,
    articleInfo,
    createArticleMW,
    createCommentMW
};