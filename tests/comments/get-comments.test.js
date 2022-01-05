const request = require('supertest')
const app = require('../../app')
const mongoose = require("mongoose");
require("dotenv").config();

jest.setTimeout(10000)

describe('Get All comments', () => {
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
    describe('GET /articles/:slug/comments', () => {
        it('Should return list of comments', (done) => {
            request(app)
            .get('/api/articles/how-to-train-your-dragon/comments')
            .expect('Content-Type', /json/)
            .expect(200, (res) => done())
        })
    })
})