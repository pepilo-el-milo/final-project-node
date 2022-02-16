const mongoose = require("mongoose");

/**
 * Tag Schema
 * @constant
 * @type {Schema}
 */
const TagSchema = new mongoose.Schema({
    tag: {type: String, required: true}
});

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);