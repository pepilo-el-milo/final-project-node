const { request, response } = require("express");
const Slug = require("slug");
const ArticleModel = require("../models/article");
const {checkTags, articleResponse, mapArticles, findByUsername} = require("../helpers/index");

/**
 * Creates and saves article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const createArticle = async (req = request, res = response) => {
    
    try {
        const {title, description, body, tagList = []} = req.body.article;
        const user = req.user;
        const slugTitle = Slug(title);
        const art = req.article;

        if(art){
            return res.status(400).json({
                msg: `Article with title '${title}' already exists`
            });
        }

        checkTags(tagList);

        const article = new ArticleModel({
            title,
            slug : slugTitle,
            description,
            body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: user._id,
            tagList,
            favoritesCount: 0
        });

        await article.populate("author", "username bio image");

        let following = req.following;

        await article.save();

        return res.status(201).json({
            article:articleResponse(article, false, following)
        }
        );


    } catch(errors) {
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Returns article by slug.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getArticle = async(req = request, res = response) => {
    try {
        const article = req.article;
        const favorited = req.favorited, following = req.following;

        return res.status(200).json({
            article:articleResponse(article, favorited, following)
        });


    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Updates article information.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const updateArticle = async(req = request, res = response) => {
    try {
        const {title, body, description} = req.body.article;
        const article = req.article;
        const user = req.user;
        const favorited = req.favorited, following = req.following;
        
        if(!user._id.equals(article.author._id)){
            return res.status(403).json({
                msg: `You are not the author of the Article '${article.title}'.`
            });
        }

        article.title = (title) ? title : article.title; 
        article.description = (description) ? description : article.description; 
        article.body = (body) ? body : article.body;
        article.slug = Slug(article.title);
        article.updatedAt = new Date().toISOString();

        await article.save();

        return res.status(200).json({
            article:articleResponse(article, favorited, following)
        });

    } catch (errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Deletes an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const deleteArticle = async(req = request, res = response) => {
    try {
        const article = req.article;
        const user = req.user;

        if(!user._id.equals(article.author._id)){
            return res.status(403).json({
                msg: `You are not the author of the Article '${article.title}'.`
            });
        }

        await ArticleModel.deleteOne({_id: article._id});

        return res.status(200).json({
            msg: `Article '${article.title}' successfully deleted.`
        });
    } catch(errors) {
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Favorites an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const favoriteArticle = async(req = request, res = response) => {
    try {
        const article = req.article;
        const user = req.user;
        let favorited = req.favorited, following = req.following;

        if(favorited){
            return res.status(400).json({
                msg: "This article is already favorited."
            });
        }

        user.favorite.push(article);

        article.favoritesCount += 1;

        await user.save();

        await article.save();

        favorited = true;

        return res.status(200).json({
            article:articleResponse(article, favorited, following)
        });


    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Unfavorite an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const unfavoriteArticle = async(req = request, res = response)=> {
    try{
        const article = req.article;
        const user = req.user;
        let favorited = req.favorited, following = req.following;

        const artind = user.favorite.findIndex((a) => a._id.equals(article._id));

        if(artind < 0){
            return res.status(400).json({
                msg: "This article is already unfavorited."
            });
        }

        user.favorite.splice(artind, 1);

        article.favoritesCount -= 1;

        await user.save();

        await article.save();

        favorited = false;

        return res.status(200).json({
            article:articleResponse(article, favorited, following)
        });

    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Returns a list of articles by a filter.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getArticles = async(req = request, res = response) => {

    try {
        const user = req.user;
        const {tag, author, favorited, limit = 20, offset = 0} = req.query;
        let filter = {};

        if(favorited){
            const userFav = await findByUsername(favorited);
            if(!userFav){
                return res.status(400).json({
                    msg: `User with username '${favorited}' could not be found`
                });
            }
            filter = {_id: userFav.favorite};
        } else if(tag) {
            filter = {tagList: tag};
        } else if(author){
            const userAuth = await findByUsername(author);
            if(!userAuth){
                return res.status(400).json({
                    msg: `User with username '${author}' could not be found`
                });
            }
            filter = {author: userAuth};
        }

        let articles = await ArticleModel.find(filter).sort({date: "asc"}).limit(parseInt(limit)).skip(parseInt(offset)).populate("author");
        const articlesCount = await ArticleModel.find(filter).countDocuments();
        articles = mapArticles(articles, user);

        return res.status(200).json({
            articles,
            articlesCount
        });

    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Returns a list of articles.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getFeed = async(req = request, res = response) => {
    try {
        const user = req.user;
        const {limit = 20, offset = 0} = req.query;

        let articles = await ArticleModel.find({author: user.following}).limit(parseInt(limit)).skip(parseInt(offset)).populate("author");

        articles = mapArticles(articles, user);

        let articlesCount = await ArticleModel.find({author: user.following}).countDocuments();

        return res.status(200).json({
            articles,
            articlesCount
        });

    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        }); 
    }
};


module.exports = {
    createArticle,
    getArticle,
    getArticles,
    updateArticle,
    deleteArticle,
    favoriteArticle,
    unfavoriteArticle,
    getFeed
};