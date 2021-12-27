const { request, response } = require("express");
const ArticleModel = require('../models/article')
const CommentModel = require('../models/comments')

const addComment = async(req = request, res= response) => {
    try {
        const {body} = req.body.comment
        const user = req.user
        const article = req.article

        if(article.comments){
            var count = article.comments.length
        } else {
            var count = 0
            article.comments = []
        }

        const comment = new CommentModel({
            id: count + 1,
            body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: user
        })

        await comment.save()

        article.comments.push(comment)

        await article.save()

        res.status(201).json({
            comment: {
                id: comment.id,
                body: comment.body,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                author: {
                    username: user.username,
                    bio: user.bio || null,
                    image: user.image || null,
                    following: false
                }
            }
        })


    } catch (errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })  
    }
}

const getComments = async(req = request, res= response) => {
    try {
        const article = req.article
        const user = req.user

        if(user){
            var following = user.following.find((s) => s._id.equals(article.author._id))
        }

        const comments = article.comments.map((com) => {
            return {
                id: com.id,
                createdAt: com.createdAt,
                updatedAt: com.updatedAt,
                body: com.body,
                author: {
                    username: com.author.username,
                    bio: com.author.bio || null,
                    image: com.author.image || null,
                    following: (following) ? true : false
                }
            }
        })

        return res.status(200).json({
            comments
        })
    } catch(errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const deleteComment = async(req = request, res= response) => {
    
    try {
        const article = req.article
        const user = req.user
        const {id} = req.params

        const comind = article.comments.findIndex((c) => c.id === parseInt(id))

        if(comind < 0){
            return res.status(400).json({
                msg: `Comment wiht id '${id}' was not found on Article '${article.title}'`
            })
        }

        if(!user._id.equals(article.comments[comind].author._id)){
            return res.status(400).json({
                msg: `You are not the author this comment.`
            })
        }

        const comdel = article.comments.splice(comind, 1)

        await article.save()

        await CommentModel.deleteOne({_id: comdel._id})

        return res.status(200).json({
            msg: 'Comment deleted successfully'
        })

    } catch (errors){
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}


module.exports = {
    addComment,
    getComments,
    deleteComment
}