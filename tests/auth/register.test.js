const request = require('supertest')
const app = require('../../app')

jest.setTimeout(10000)

describe('Auth', () => {
    describe('POST /users', () => {
        it('Should return 400 - No user', (done) => {
            request(app)
            .post('/api/users')
            .send({email:"test@hotmail.com", password:"test2021", username:"testuser"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
        })
    })
    describe('POST /users', () => {
        it('Should return 400 - No email and password', (done) => {
            request(app)
            .post('/api/users')
            .send({user:{username:"testuser"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
        })
    })
    describe('POST /users', () => {
        it('Should register user', (done) => {
            request(app)
            .post('/api/users')
            .send({user:{email:"test@hotmail.com", password:"test2021", username:"testuser"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done)
        })
    })
})