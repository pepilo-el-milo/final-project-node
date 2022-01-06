const request = require('supertest')
const app = require('../../app')
const mongoose = require("mongoose");
const UserModel = require("../../models/user")
require("dotenv").config();

jest.setTimeout(10000)

describe('Auth', () => {
    beforeAll((done) => {
        mongoose.connect(process.env.MONGO).then(() => {
            done()
        });
    })
    afterAll((done) => {
        UserModel.findOneAndRemove({email: "test@hotmail.com"}).then((docs) => {
            mongoose.disconnect().then(() => {
                done()
            });
        });

    })
    describe('POST /users', () => {
        it('Should return 400 - No user', (done) => {
            request(app)
            .post('/api/users')
            .send({email:"test@hotmail.com", password:"test2021", username:"testuser"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done)
        })
    })
    describe('POST /users', () => {
        it('Should return 400 - No email and password', (done) => {
            request(app)
            .post('/api/users')
            .send({user:{username:"testuser"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done)
        })
    })
    describe('POST /users', () => {
        it('Should register user', (done) => {
            request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({user:{email:"test@hotmail.com", password:"test2021", username:"testuser"}})
            .expect('Content-Type', /json/)
            .expect(201, (res) => done())
        })
    })
})