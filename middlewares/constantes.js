const {check} = require('express-validator')

const userInfo = check('user', 'User information is required').not().isEmpty()

const commonMW = [
    userInfo,
    check('user.email', 'Email is required').not().isEmpty(),
    check('user.email', 'Email format is incorrect').isEmail(),
]

const authMW = [
    ...commonMW,
    check('user.password', 'Password is required').not().isEmpty(),
]

const registrationMW = [
    ...commonMW,
    check('user.username', 'Username is required').not().isEmpty(),
    check('user.password', 'Password is required').not().isEmpty(),
]

const articleInfo = check('article', 'Article information is required').not().isEmpty()

const createArticleMW = [
    articleInfo,
    check('article.title', 'The article title is required').not().isEmpty(),
    check('article.description', 'The article description is required').not().isEmpty(),
    check('article.body', 'The article body is required').not().isEmpty(),
    check('article.tagList', 'The tags received are not a list').isArray(),
]

const createCommentMW = [
    check('comment', 'Comment information is required').not().isEmpty(),
    check('comment.body', 'the comment body is required').not().isEmpty(),
]

module.exports = {
    authMW,
    registrationMW,
    userInfo,
    articleInfo,
    createArticleMW,
    createCommentMW
}