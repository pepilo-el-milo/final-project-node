const {Schema, model} = require("mongoose");

/**
 * User Schema
 * @constant
 * @type {Schema}
 */
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {type: String},
    image: {type: String},
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    favorite: [{type: Schema.Types.ObjectId, ref: "Article"}]
});

module.exports = model("User", UserSchema);