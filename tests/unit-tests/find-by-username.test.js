const mongoose = require("mongoose");
require("dotenv").config();
const {findByUsername} = require("../../src/helpers/index")

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
    it('Should be ok', async() => {
        expect(1).toBe(1);
    })
    it('Should return user - PepiloXD', () => {
        expect.assertions(1)
        return findByUsername('PepiloXD').then((user) => {
            expect(user.email).toBe('pepe@hotmail.com')
        })
    })
})