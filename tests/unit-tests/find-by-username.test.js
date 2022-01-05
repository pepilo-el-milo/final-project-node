const mongoose = require("mongoose");
require("dotenv").config();
const {findByUsername} = require("../../helpers/index")

describe('Find user by username', () => {
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