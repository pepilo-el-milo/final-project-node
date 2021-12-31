const request = require('supertest')
const app = require('../../app')

jest.setTimeout(20000)

describe('Auth', () => {
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
        it('Should register user', async(done) => {
            await request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({user:{email:"test@hotmail.com", password:"test2021", username:"testuser"}})
            .expect('Content-Type', /json/)
            .expect(201)
        })
    })
})