const request = require('supertest')
const app = require('../../src/app')
const mongoose = require("mongoose");
require("dotenv").config();

jest.setTimeout(10000)

describe('GET /api/tags', () => {
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
    it('Should get Tags', (done) => {
        request(app)
        .get('/api/tags')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (res) => done())
    })
})