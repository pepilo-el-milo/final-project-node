const mongoose = require("mongoose");
require("dotenv").config();
const {checkTags} = require("../../helpers/index")

describe('Check Tags', () => {
    beforeAll((done) => {
        mongoose.connect(process.env.MONGO).then(() => {
            done()
        });
    })
    afterAll((done) => {
        mongoose.disconnect().then(() => {
            done()
        })
    })
})