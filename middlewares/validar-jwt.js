const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger");

const UserModel = require("../models/user");

/**
 * Searchs user from given token.
 * @async
 * @function
 * @param {string} token 
 * @returns {UserModel}
 */
const getUserFromToken = async (token) => {
    try {
        const {userId} = jwt.verify(token, process.env.SECRETKEY);

        return await UserModel.findById(userId).populate("following").populate("favorite"); 
    } catch (err) {
        logger.error(err);
        return null;
    }
};

/**
 * Validates if token is not valid or expired.
 * @async
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 * @returns {any}
 */
const validarJWT = async(req = request, res = response, next) =>{

    let token = req.header("Authorization");
    try{

        if(!token){
            logger.warn("Token not valid");
            return res.status(401).json({
                msg: "Token not valid"
            });
        }

        token = token.split(" ")[1];

        const user = await getUserFromToken(token);

        if (!user){
            logger.warn("Token not valid - User not found");
            return res.status(401).json({
                msg: "Token not valid - User not found"
            });
        }

        req.user = user;
        req.token = token;

        next();
    } catch(err){
        logger.error("Token not valid - " + err);
        return res.status(401).json({
            msg: "Token not valid",
            err
        });
    }
};

/**
 * Verifies if a token was given or not.
 * @async
 * @function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verificarJWT = async(req = request, res, next) => {
    let token = req.header("Authorization");

    if(token){
        try{
            token = token.split(" ")[1];
            const user = await getUserFromToken(token);
            
            req.user = user;
            req.token = token;
    
            next();
        } catch(err){
            next();
        }
    } else {
        next();
    }
    
};

module.exports = {
    validarJWT,
    verificarJWT
};