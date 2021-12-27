const { request, response } = require("express");
const Slug = require('slug')
const ArticleModel = require('../models/article')
const TagModel = require('../models/tags')
const UserModel = require('../models/user')

const checkTags = async (tagList = []) =>{
    try {
        for (let t of tagList) {
            let tag = await TagModel.findOne({tag: t})
            if(!tag){
                tag = new TagModel({tag: t})
                await tag.save()
            }
        }

    } catch(error) {
        console.error('No se guardaron tags', error)
        return null
    }
}

const createArticle = async (req = request, res = response) => {
    
    try {
        const {title, description, body, tagList = []} = req.body.article

        const user = req.user

        const slugTitle = Slug(title)

        const art = await ArticleModel.findOne({slug: slugTitle})

        if(art){
            return res.status(400).json({
                msg: `Article with title '${title}' already exists`
            })
        }

        checkTags(tagList)

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
        })

        await article.populate('author', 'username bio image')

        let following = (user.following.find((s) => s._id.equals(article.author._id) ))

        await article.save()

        return res.status(201).json({
            article:{
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: false,
                favoritesCount: article.favoritesCount,
                author: {
                    username: article.author.username,
                    bio: article.author.bio || null,
                    image: article.author.image || null,
                    following: (following) ? true : false,
                }
            }
        }
        )


    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const getArticle = async(req = request, res = response) => {
    try {
        const article = req.article
        const user = req.user
        let favorited, following;
         
        if(user){
            following = user.following.find((s) => s._id.equals(article.author._id))
            favorited = user.favorite.find((s) => s._id.equals(article._id))
        }

        return res.status(200).json({
            article:{
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: (favorited) ? true : false,
                favoritesCount: article.favoritesCount,
                author: {
                    username: article.author.username,
                    bio: article.author.bio || null,
                    image: article.author.image || null,
                    following: (following) ? true : false,
                }
            }
        })


    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })   
    }
}

const updateArticle = async(req = request, res = response) => {
    try {
        const {title, body, description} = req.body.article
        const user = req.user
        const article = req.article

        let favorited, following;
         
        if(user){
            following = user.following.find((s) => s._id.equals(article.author._id))
            favorited = user.favorite.find((s) => s._id.equals(article._id))
        }

        article.title = (title) ? title : article.title 
        article.description = (description) ? description : article.description 
        article.body = (body) ? body : article.body 
        article.slug = Slug(article.title)
        article.updatedAt = new Date().toISOString()

        await article.save()

        return res.status(200).json({
            article:{
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: (favorited) ? true : false,
                favoritesCount: article.favoritesCount,
                author: {
                    username: article.author.username,
                    bio: article.author.bio || null,
                    image: article.author.image || null,
                    following: (following) ? true : false,
                }
            }
        })

    } catch (errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })     
    }
}

const deleteArticle = async(req = request, res = response) => {
    try {
        const article = req.article
        const user = req.user

        if(!user._id.equals(article.author._id)){
            return res.status(400).json({
                msg: `You are not the author of the Article '${article.title}'.`
            })
        }

        await ArticleModel.deleteOne({_id: article._id})

        return res.status(200).json({
            msg: `Article '${article.title}' successfully deleted.`
        })
    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })  
    }
}

const favoriteArticle = async(req = request, res = response) => {
    try {
        const article = req.article
        const user = req.user
        let following = req.following
        let favorited = req.favorited

        if(favorited){
            return res.status(400).json({
                msg: 'This article is already favorited.'
            })
        }

        user.favorite.push(article)

        article.favoritesCount += 1

        await user.save()

        await article.save()

        favorited = true

        return res.status(200).json({
            article:{
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited,
                favoritesCount: article.favoritesCount,
                author: {
                    username: article.author.username,
                    bio: article.author.bio || null,
                    image: article.author.image || null,
                    following
                }
            }
        })


    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const unfavoriteArticle = async(req = request, res = response)=> {
    try{
        const article = req.article
        const user = req.user
        let following = req.following
        let favorited = req.favorited

        const artind = user.favorite.findIndex((a) => a._id.equals(article._id))

        if(artind < 0){
            return res.status(400).json({
                msg: 'This article is already unfavorited.'
            })
        }

        user.favorite.splice(artind, 1)

        article.favoritesCount -= 1

        await user.save()

        await article.save()

        favorited = false

        return res.status(200).json({
            article:{
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited,
                favoritesCount: article.favoritesCount,
                author: {
                    username: article.author.username,
                    bio: article.author.bio || null,
                    image: article.author.image || null,
                    following
                }
            }
        })

    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const mapArticles = (articles, user) => {
    return articles.map((a) => {

        let following = false
        let favorited = false

        if(user){
            following = (user.following.find((s) => s._id.equals(a.author._id))) ? true : false
            favorited = (user.favorite.find((s) => s._id.equals(a._id))) ? true: false
        }

        return {
            slug: a.slug,
            title: a.title,
            description: a.description,
            body: a.body,
            tagList: a.tagList,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt,
            favorited,
            favoritesCount: a.favoritesCount,
            author: {
                username: a.author.username,
                bio: a.author.bio || null,
                image: a.author.image || null,
                following
            }
        }
    })
}

// TODO: Pendiente Get Articles
const getArticles = async(req = request, res = response) => {

    try {
        const user = req.user
        const {tag, author, favorited, limit = 20, offset = 0} = req.query

        let articles;

        if(favorited){
            let userFav = await UserModel.find({username: favorited})
            if(!user){
                return res.status(400).json({
                    msg: `User with username '${favorited}' could not be found`
                })
            }

            articles = await ArticleModel.find({_id: userFav.favorite},null, {limit, offset})
            articles = mapArticles(articles, user)

            return res.status(200).json({
                articles,
                articlesCount : articles.length
            })

        }

        const filter = {}
        if(tag) filter['tagList'] = tag 
        
        articles = await ArticleModel.find(filter,null, {limit, offset}).populate('author').sort({date: 'asc'})

        if(author){
            articles = articles.filter((a) => a.author.username === author)
        }

        articles = mapArticles(articles, user)

        return res.status(200).json({
            articles,
            articlesCount: articles.length
        })

    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })  
    }
}

const getFeed = async(req = request, res = response) => {
    try {
        const user = req.user
        const {limit = 20, offset = 0} = req.query

        // let articles = []

        // for(let f of user.following){
        //     articles.push()
        // }

        let articles = await ArticleModel.find({author: user.following},null,{limit, offset}).where()

        articles = articles.map((a) => {

            let following = false
            let favorited = false

            if(user){
                following = (user.following.find((s) => s._id.equals(a.author._id))) ? true : false
                favorited = (user.favorite.find((s) => s._id.equals(a._id))) ? true: false
            }

            return {
                slug: a.slug,
                title: a.title,
                description: a.description,
                body: a.body,
                tagList: a.tagList,
                createdAt: a.createdAt,
                updatedAt: a.updatedAt,
                favorited,
                favoritesCount: a.favoritesCount,
                author: {
                    username: a.author.username,
                    bio: a.author.bio || null,
                    image: a.author.image || null,
                    following
                }
            }
        })

        return res.status(200).json({
            articles,
            articlesCount: articles.length
        })

    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })  
    }
}


module.exports = {
    createArticle,
    getArticle,
    getArticles,
    updateArticle,
    deleteArticle,
    favoriteArticle,
    unfavoriteArticle,
    getFeed
}