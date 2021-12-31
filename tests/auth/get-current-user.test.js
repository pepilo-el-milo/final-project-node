// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2NDA3MTI4NDAsImV4cCI6MTY0MDcxNjQ0MH0._HV6EZ8rre0DGqNU3G1DhVXujajGH6D_YqnesrAvKsM
const request = require('supertest')
const app = require('../../app')

jest.setTimeout(20000)

describe('Get User', () => {
    describe('GET /user', () => {
        it('Should return token no valid', (done) => {
            request(app)
            .get('/api/user')
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2DDA3MTI4NDAsImV4cCI6MTY0MDcxNjQ0MH0._HV6EZ8rre0DGqNU3G1DhVXujajGH6D_YqnesrAvKsM')
            .expect('Content-Type', /json/)
            .expect(401, done)
        })
        it('Should return user', async(done) => {
            await request(app)
            .get('/api/user')
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWMzYjYyZWExYzVjMjRmNjc2OGI4MjUiLCJpYXQiOjE2NDA5MDc2NDl9.cVPRw9Ps9MRapb5ja5_vVm9tHFWhPX4dyykqcn0gNTI')
            .expect('Content-Type', /json/)
            .expect(200)
        })
    })
})