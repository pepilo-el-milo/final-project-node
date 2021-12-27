const { request, response } = require("express");
const ArticleModel = require('../models/article')

const findArticleBySlug = async(req = request, res = response, next) => {
    try{
        const {slug} = req.params
        const user = req.user

        const article = await ArticleModel.findOne({slug}, 'slug title description body tagList favoritesCount createdAt updatedAt author').populate('author', 'username bio image').populate({path: 'comments', populate: {path: 'author'}})
        if(!article){
            return res.status(400).json({
                msg: `Article with title '${slug}' was not found`
            })   
        }

        req.article = article

        if(user){
            req.following = (user.following.find((s) => s._id.equals(article.author._id))) ? true : false
            req.favorited = (user.favorite.find((s) => s._id.equals(article._id))) ? true: false
        }

        next()
    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })  
    }
}

module.exports = {
    findArticleBySlug
}