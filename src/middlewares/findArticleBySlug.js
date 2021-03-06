const { request, response } = require("express");
const ArticleModel = require("../models/article");
const logger = require("../helpers/logger");

/**
 * Searchs article by title slug.
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 * @returns {any}
 */
const findArticleBySlug = async(req = request, res = response, next) => {
    try{
        const {slug} = req.params;
        const user = req.user;

        const article = await ArticleModel.findOne({slug}, "slug title description body tagList favoritesCount createdAt updatedAt author")
        .populate("author", "username bio image")
        .populate({path: "comments", populate: {path: "author"}});
        if(!article){
            logger.warn(`Article with title '${slug}' was not found`);
            return res.status(400).json({
                msg: `Article with title '${slug}' was not found`
            });
        }

        req.article = article;

        let favorited = false, following = false;

        if(user){
            following = (user.following.find((s) => s._id.equals(article.author._id))) ? true : false;
            favorited = (user.favorite.find((s) => s._id.equals(article._id))) ? true: false;
        }

        req.favorited = favorited;
        req.following = following;

        next();
    } catch(errors) {
        logger.error("Internal Server Error " + errors);
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

module.exports = {
    findArticleBySlug
};