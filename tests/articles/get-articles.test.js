const request = require("supertest");
const app = require("../../app");

jest.setTimeout(20000);

describe("Get Articles", () => {
    describe("GET /api/articles", () => {
        it("Should return articles", async(done) => {
            await request(app)
            .get("/api/articles")
            .expect("Content-Type", /json/)
            .expect(200);
        });
    });
});