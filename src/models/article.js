const mongoose = require("mongoose");

/**
 * Article Schema
 * @constant
 * @type {Schema}
 */
const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
    body: {type: String, required: true},
    tagList: [{type: String}],
    createdAt: {type: String, required: true},
    favoritesCount: {type: Number},
    updatedAt: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
},{
    timestamps: false
});

module.exports = mongoose.models.Article || mongoose.model("Article", ArticleSchema);