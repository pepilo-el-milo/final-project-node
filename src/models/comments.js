const mongoose = require("mongoose");

/**
 * Comment Schema
 * @constant
 * @type {Schema}
 */
const CommentSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    body: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    timestamps : false
});

module.exports = mongoose.models.Comment ||  mongoose.model("Comment", CommentSchema);