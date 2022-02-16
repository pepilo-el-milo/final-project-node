
/**
 * Returns response format for an article.
 * 
 * @function
 * @param {ArticleModel} article 
 * @param {boolean} favorited 
 * @param {boolean} following 
 * @returns {Object}
 */
const articleResponse = (article, favorited, following) => {
    return {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited,
        favoritesCount: article.favoritesCount,
        author: {
            username: article.author.username,
            bio: article.author.bio || null,
            image: article.author.image || null,
            following,
        }
    };
};
/**
 * Maps and formats articles from a list of articles.
 * 
 * @function
 * @param {ArticleModel[]} articles 
 * @param {UserModel} user 
 * @returns {Object[]}
 */
const mapArticles = (articles, user) => {
    return articles.map((a) => {

        let following = false;
        let favorited = false;

        if(user){
            following = (user.following.find((s) => s._id.equals(a.author._id))) ? true : false;
            favorited = (user.favorite.find((s) => s._id.equals(a._id))) ? true: false;
        }

        return articleResponse(a, favorited, following);
    });
};

/**
 * Returns response format for a user profile
 * 
 * @function
 * @param {UserModel} user 
 * @param {boolean} following 
 * @returns {Object}
 */
const profileResponse = (user, following) => {
    return {
        username: user.username,
        bio: user.bio || null,
        image: user.image || null,
        following
    };
};

/**
 * Returns response format for a user
 * 
 * @function
 * @param {UserModel} user 
 * @param {string} token 
 * @returns {Object}
 */
const userResponse = (user, token) => {
    return {
        email: user.email,
        token: token,
        username: user.username,
        bio: user.bio || null,
        image: user.image || null
    };
};

/**
 * Returns response format for a comment
 * 
 * @function
 * @param {CommentModel} comment 
 * @param {UserModel} user 
 * @param {boolean} following 
 * @returns {Object}
 */
const commentResponse = (comment, user, following) => {
    return {
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: {
            username: user.username,
            bio: user.bio || null,
            image: user.image || null,
            following
        }
    };
};

/**
 * Maps and formats comments from a list of comments.
 * 
 * @function
 * @param {CommentModel[]} comments 
 * @param {UserModel} user 
 * @returns {Object[]}
 */
const mapComments = (comments, user) => {
    return comments.map((com) => {

        let following = false;

        if(user){
            following = (user.following.find((s) => s._id.equals(com.author._id)))? true: false;            
        }

        return commentResponse(com, com.author, following);
    });
};

module.exports = {
    articleResponse,
    mapArticles,
    profileResponse,
    userResponse,
    commentResponse,
    mapComments
};