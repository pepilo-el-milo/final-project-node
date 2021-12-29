const request = require('supertest')
const app = require('../../app')

jest.setTimeout(20000)

describe('Tags', () => {
    describe('GET /api/tags', () => {
        it('Should get Tags', (done) => {
            request(app)
            .get('/tags')
            .expect('Content-Type', /json/)
            .expect(200, () => done())
        })
    })
})