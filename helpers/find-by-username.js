const UserModel = require("../models/user");


const findByUsername = async(username) => {
    const user = await UserModel.findOne({username});
    return user;
};

module.exports = {
    findByUsername
};