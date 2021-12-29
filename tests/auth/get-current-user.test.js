// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2NDA3MTI4NDAsImV4cCI6MTY0MDcxNjQ0MH0._HV6EZ8rre0DGqNU3G1DhVXujajGH6D_YqnesrAvKsM
const request = require('supertest')
const app = require('../../app')

jest.setTimeout(10000)

describe('Get User', () => {
    describe('GET /user', () => {
        it('Should return token no valid', (done) => {
            request(app)
            .get('/api/user')
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2DDA3MTI4NDAsImV4cCI6MTY0MDcxNjQ0MH0._HV6EZ8rre0DGqNU3G1DhVXujajGH6D_YqnesrAvKsM')
            .expect('Content-Type', /json/)
            .expect(401, done)
        })
        it('Should return user', (done) => {
            request(app)
            .get('/api/user')
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM0ZjFhZGY1MDY4NDk2NWFiYTMyZTIiLCJpYXQiOjE2NDA4MDE1MTYsImV4cCI6MTY0MDgwNTExNn0._5BqaoDUUUFG6heLxdRwkUBUfJDFqKQV4WLnE1GZXq4')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
              })
        })
    })
})