const request = require('supertest')
const app = require('../../app')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
require("dotenv").config();

jest.setTimeout(10000)

let token;

describe('Get User', () => {
    beforeAll((done) => {
        mongoose.connect(process.env.MONGO).then(() => {
            done()
        });
        token = jwt.sign({userId: '61c3b62ea1c5c24f6768b825'}, process.env.SECRETKEY)
    })
    afterAll((done) => {
        mongoose.disconnect().then(() => {
            done()
        })
    })
    describe('GET /user', () => {
        it('Should return token no valid', (done) => {
            request(app)
            .get('/api/user')
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2DDA3MTI4NDAsImV4cCI6MTY0MDcxNjQ0MH0._HV6EZ8rre0DGqNU3G1DhVXujajGH6D_YqnesrAvKsM')
            .expect('Content-Type', /json/)
            .expect(401, (res) => done())
        })
        it('Should return user', (done) => {
            request(app)
            .get('/api/user')
            .set('Authorization', `Token ${token}`)
            .expect('Content-Type', /json/)
            .expect(200, (res) => done())
        })
    })
})