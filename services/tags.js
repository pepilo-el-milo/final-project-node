const { response } = require("express");
const TagModel = require("../models/tags");


/**
 * Get articles tags.
 * 
 * @async
 * @method
 * @param {Request} req 
 * @param {Response} res 
 * @returns {any}
 */
const getTags = async(req, res = response) => {
    try{
        let tags = await TagModel.find();

        tags = tags.map((t) => t.tag);

        return res.status(200).json({
            tags
        });
    } catch(errors){
        return res.status(500).json({
            msg: "Internal Server Error",
            errors
        }); 
    }
};

module.exports = {
    getTags
};