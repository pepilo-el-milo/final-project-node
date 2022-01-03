const { request, response } = require("express");
const { commentResponse, mapComments } = require("../helpers/responses");
const CommentModel = require("../models/comments");

/**
 * Adds a comment for an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const addComment = async(req = request, res= response) => {
    try {
        const {body} = req.body.comment;
        const user = req.user;
        const article = req.article;

        let count = 0;

        if(article.comments){
            count = article.comments.length;
        } else {
            article.comments = [];
        }

        const comment = new CommentModel({
            id: count + 1,
            body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: user
        });

        await comment.save();

        article.comments.push(comment);

        await article.save();

        res.status(201).json({
            comment: commentResponse(comment, user, false)
        });


    } catch (errors) {
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Returns a list of comments from an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getComments = async(req = request, res= response) => {
    try {
        const article = req.article;

        const comments = mapComments(article.comments);

        return res.status(200).json({
            comments
        });
    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Deletes a comment from an article.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const deleteComment = async(req = request, res= response) => {
    
    try {
        const article = req.article;
        const user = req.user;
        const {id} = req.params;

        const comind = article.comments.findIndex((c) => c.id === parseInt(id));

        if(comind < 0){
            return res.status(400).json({
                msg: `Comment wiht id '${id}' was not found on Article '${article.title}'`
            });
        }

        if(!user._id.equals(article.comments[comind].author._id)){
            return res.status(400).json({
                msg: "You are not the author this comment."
            });
        }

        const comdel = article.comments.splice(comind, 1);

        await article.save();

        await CommentModel.deleteOne({_id: comdel._id});

        return res.status(200).json({
            msg: "Comment deleted successfully"
        });

    } catch (errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};


module.exports = {
    addComment,
    getComments,
    deleteComment
};