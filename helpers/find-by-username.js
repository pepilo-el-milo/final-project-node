const UserModel = require("../models/user");

/**
 * Searchs user by username and returns it.
 * 
 * @async
 * @function
 * @param {string} username 
 * @returns {UserModel}
 */
const findByUsername = async(username) => {
    const user = await UserModel.findOne({username});
    return user;
};

module.exports = {
    findByUsername
};