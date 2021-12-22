const mongoose = require('mongoose')
require('dotenv').config()

module.exports = {
    connection : mongoose.connect(process.env.MONGO)
}