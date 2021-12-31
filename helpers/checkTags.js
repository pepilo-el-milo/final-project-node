const TagModel = require("../models/tags");

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
        console.error("No se guardaron tags", error);
        return null;
    }
};

module.exports = {
    checkTags
};