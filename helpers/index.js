const {checkTags} = require("./checkTags");
const {articleResponse, mapArticles} = require("./responses");
const {findByUsername} = require("./find-by-username");

module.exports = {
    checkTags,
    articleResponse,
    mapArticles,
    findByUsername
};