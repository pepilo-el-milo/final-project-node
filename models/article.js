const {Schema, model} = require('mongoose')

const ArticleSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
    body: {type: String, required: true},
    tagList: [{type: String}],
    createdAt: {type: String, required: true},
    updatedAt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = model('Article', ArticleSchema)