const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");

const uri = config.get("mongo");

module.exports = {
    connection : mongoose.connect(uri)
};