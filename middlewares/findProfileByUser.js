const { request, response } = require("express");
const UserModel = require('../models/user')

const findProfileByUser = async(req = request, res = response, next) => {
    try{
        const {username} = req.params
        const profile = await UserModel.findOne({username})

        if(!profile) {
            return res.status(400).json({
                msg: `Profile with username ${username} was not found`,
                errors
            })
        } else {
            req.profile = profile
            next()
        }
    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

module.exports = {
    findProfileByUser
}

