const {articleResponse, userResponse, profileResponse, commentResponse} = require("../../src/helpers/index")
const user = require("../../src/models/user")

const testUser = {
    email: 'test@hotmail.com',
    username: 'testuser',
    bio: 'test',
    image: 'test'
}
const token = '123'
const testArticle = {
    slug: 'test-article',
    title: 'Test Article',
    description: 'Test description',
    body: 'Test body',
    tagList: ['Test'],
    createdAt: 'date',
    updatedAt: 'date',
    favoritesCount: 4,
    author: testUser
}
const testComment = {
    id: 1,
    body: 'test comment',
    createdAt: 'date',
    updatedAt: 'date',
}

describe('Response Formats', () => {
    it('Should be ok', async() => {
        expect(1).toBe(1);
    })
    it('Should have the right format - Article', () => {
        expect(articleResponse(testArticle, true, false)).toEqual(expect.objectContaining({
            slug: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            body: expect.any(String),
            tagList: expect.anything(),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            favorited: expect.any(Boolean),
            favoritesCount: expect.any(Number),
            author: {
                username: expect.any(String),
                bio: expect.any(String),
                image: expect.any(String),
                following: expect.any(Boolean),
            }
        }))
    })
    it('Should have the right format - User', () => {
        expect(userResponse(testUser, token)).toEqual(expect.objectContaining({
            email: expect.any(String),
            token: expect.any(String),
            username: expect.any(String),
            bio: expect.any(String),
            image: expect.any(String)
        }))
    })
    it('Should have the right format - Profile', () => {
        expect(profileResponse(testUser, true)).toEqual(expect.objectContaining({
            username: expect.any(String),
            bio: expect.any(String),
            image: expect.any(String),
            following: expect.any(Boolean)
        }))
    })
    it('Should have the right format - Comment', () => {
        expect(commentResponse(testComment, testUser, false)).toEqual(expect.objectContaining({
            id: expect.any(Number),
            body: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            author: {
                username: expect.any(String),
                bio: expect.any(String),
                image: expect.any(String),
                following: expect.any(Boolean)
            }
        }))
    })
})