const { request, response } = require("express");
const UserModel = require("../models/user");
const logger = require("../helpers/logger");

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
            logger.warn(`Profile with username ${username} was not found`);
            return res.status(403).json({
                msg: `Profile with username ${username} was not found`
            });
        } else {
            req.profile = profile;
            next();
        }
    } catch(errors) {
        logger.error("Internal Server Error " + errors);
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

module.exports = {
    findProfileByUser
};

