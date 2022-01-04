const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/user");
const { userResponse } = require("../helpers/responses");
const logger = require("../helpers/logger");

/**
 * Get current User information.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getUser = async (req = request, res= response) => {
    try {
        const user = await UserModel.findById(req.user._id);
        const token = req.token;

        return res.status(200).json({
            user: userResponse(user, token)
        });
    } catch(errors) {
        logger.error("Internal Server Error - " + errors);
        res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Updates current User information.
 * 
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const updateUser = async(req = request, res = response) => {
    try {
        const user = req.user;
        const token = req.token;
        let {email, username, password, image, bio} = req.body.user;

        if(password) {
            let salt = bcryptjs.genSaltSync(10);
            password = bcryptjs.hashSync(password, salt);
        }
        const userUpt = await UserModel.findByIdAndUpdate(req.user._id, {
            email: (email) ? email : user.email,
            password: (password) ? password : user.password,
            username: (username) ? username : user.username,
            image: (image) ? image : user.image,
            bio: (bio) ? bio : user.bio,
        }, {new : true});

        return res.status(200).json({
            user: userResponse(userUpt, token)
        });

    } catch(errors) {
        logger.error("Internal Server Error - " + errors);
        res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

module.exports = {
    getUser,
    updateUser
};