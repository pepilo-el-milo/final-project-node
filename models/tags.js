const {Schema, model} = require('mongoose')

const TagSchema = new Schema({
    tag: {type: String, required: true}
})

module.exports = model('Tag', TagSchema)