const mongoose = require("mongoose");

/**
 * User Schema
 * @constant
 * @type {Schema}
 */
const UserSchema = new mongoose.Schema({
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
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    favorite: [{type: mongoose.Schema.Types.ObjectId, ref: "Article"}]
},{
    timestamps: false
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);