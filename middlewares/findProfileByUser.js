const { request, response } = require("express");
const UserModel = require("../models/user");

/**
 * Searchs user profile by username.
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 * @returns {any}
 */
const findProfileByUser = async(req = request, res = response, next) => {
    try{
        const {username} = req.params;
        const profile = await UserModel.findOne({username});

        if(!profile) {
            return res.status(403).json({
                msg: `Profile with username ${username} was not found`
            });
        } else {
            req.profile = profile;
            next();
        }
    } catch(errors) {
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

module.exports = {
    findProfileByUser
};

