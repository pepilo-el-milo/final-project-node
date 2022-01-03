const {Schema, model} = require("mongoose");

/**
 * Comment Schema
 * @constant
 * @type {Schema}
 */
const CommentSchema = new Schema({
    id: {type: Number, required: true},
    body: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {
    timestamps : false
});

module.exports = model("Comment", CommentSchema);