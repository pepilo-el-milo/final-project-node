const TagModel = require("../models/tags");
const logger = require("./logger");

/**
 * Checks if tags exist on database, if not, they are added.
 * 
 * @async
 * @function
 * @param {string[]} tagList 
 * @returns {any}
 */
const checkTags = async (tagList = []) =>{
    try {
        for (let t of tagList) {
            let tag = await TagModel.findOne({tag: t});
            if(!tag){
                tag = new TagModel({tag: t});
                await tag.save();
            }
        }

    } catch(error) {
        logger.error("No se guardaron tags", error);
        return null;
    }
};

module.exports = {
    checkTags
};