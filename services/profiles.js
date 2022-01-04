const { request, response } = require("express");
const { profileResponse } = require("../helpers/responses");
const logger = require("../helpers/logger");

/**
 * Returns a user profile.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getProfile = async (req = request, res = response) => {
    try {
        const user = req.user;
        const profile = req.profile;

        let following = false;

        if(user){
            following = (user.following.find((s) => s._id.equals(profile._id) )) ? true : false;
        }

        return res.status(200).json({
            profile: profileResponse(profile, following)
        });

    } catch(errors) {
        logger.error("Internal Server Error - " + errors);
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Follows a user.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const followUser = async (req = request, res = response) => {
    try{
        const user = req.user;
        const profile = req.profile;

        if(profile._id.equals(user._id)) {
            logger.warn("A user can't be followed by itself.");
            return res.status(400).json({
            msg: "A user can't be followed by itself."
            });
        }

        let following = (user.following.find((s) => s._id === profile._id )) ? true : false;

        if(!following) {
            user.following.push(profile);
            await user.save();

            return res.status(200).json({
                profile: profileResponse(profile, true)
            });
        } else {
            logger.warn(`User requesting already follows the user ${user.username}`);
            return res.status(400).json({
                msg: `You already follow the user ${user.username}`
                });
        }

    } catch(errors) {
        logger.error("Internal Server Error - " + errors);
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

/**
 * Unfollows a user.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const unfollowUser = async (req = request, res = response) => {
    try{
        const user = req.user;
        const profile = req.profile;

        if(profile._id.equals(user._id)) {
            logger.warn("A user can't be unfollowed by itself.");
            return res.status(400).json({
            msg: "A user can't be unfollowed by itself."
            });
        }

        let index = user.following.findIndex((s) => s._id === profile._id );

        user.following.splice(index, 1);
        await user.save();

        return res.status(200).json({
            profile: profileResponse(profile, false)
        });

    } catch(errors) {
        logger.error("Internal Server Error - " + errors);
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }
};

module.exports = {
    getProfile,
    followUser,
    unfollowUser
};