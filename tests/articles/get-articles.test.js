const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
require("dotenv").config();

jest.setTimeout(10000);

describe("GET /api/articles", () => {
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
    it("Should return articles", (done) => {
        request(app)
        .get("/api/articles")
        .expect("Content-Type", /json/)
        .expect(200, (res) => done());
    });
});