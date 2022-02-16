const {checkTags} = require("./checkTags");
const {articleResponse,mapArticles,profileResponse,userResponse,commentResponse,mapComments} = require("./responses");
const {findByUsername} = require("./find-by-username");

module.exports = {
    checkTags,
    findByUsername,
    articleResponse,
    mapArticles,
    profileResponse,
    userResponse,
    commentResponse,
    mapComments
};