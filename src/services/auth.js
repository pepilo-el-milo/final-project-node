const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const logger = require("../helpers/logger");
const config = require("config");
require("dotenv").config();

/**
 * Logs in a user.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const login = async(req = request, res = response) => {
    const {email, password} = req.body.user;

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            logger.warn(`User with email ${email} doesn't exist`);
            return res.status(400).json({
                msg: `User with email ${email} doesn't exist`
            });
        }

        const validPassword = bcryptjs.compareSync(password,user.password);

        if(!validPassword){
            logger.warn("Email / Password are incorrect");
            return res.status(403).json({
                msg: "Email / Password are incorrect"
            });
        }

        const token = jwt.sign({userId : user._id}, config.get("secretkey"));

        return res.status(200).json({
            user: {
                email: user.email,
                token,
                username: user.username,
                bio: user.bio || null,
                image: user.image || null
            }
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
 * Creates a user.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const createUser = async(req = request, res = response) => {

    try {
        const {username, email, password} = req.body.user;

        let user = await UserModel.findOne({email});

        if(user){
            logger.warn(`User with email ${email} already exists`);
            return res.status(400).json({
                msg: `User with email ${email} already exists`
            });
        }

        user = await UserModel.findOne({username});

        if(user){
            logger.warn(`User with username ${username} already exists`);
            return res.status(400).json({
                msg: `User with username ${username} already exists`
            });
        }

        user = new UserModel({
            username,
            email,
            password
        });

        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        
        const token = jwt.sign({userId : user._id}, config.get("secretkey"), {expiresIn: "1h"});

        return res.status(201).json({
            user: {
                email: user.email,
                token,
                username: user.username,
                bio: user.bio || null,
                image: user.image || null
            }
        });

    } catch(errors){
        logger.error("Internal Server Error - " + errors);
        res.status(500).json({
            msg: "Internal Server Error",
            errors
        });
    }

};

module.exports = {
    login,
    createUser
};