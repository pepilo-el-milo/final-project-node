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
    it('Should be ok', async() => {
        expect(1).toBe(1);
    })
})