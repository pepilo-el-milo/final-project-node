const request = require('supertest')
const app = require('../../app')

jest.setTimeout(20000)

describe('GET /api/tags', () => {
    it('Should get Tags', async (done) => {
        await request(app)
        .get('/api/tags')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})