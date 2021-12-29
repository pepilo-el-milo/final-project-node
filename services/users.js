const { request, response } = require("express");
const bcryptjs = require('bcryptjs')

const UserModel = require('../models/user');
const { userResponse } = require("../helpers/responses");

const getUser = async (req = request, res= response) => {
    try {
        const user = await UserModel.findById(req.user._id)
        const token = req.token

        return res.status(200).json({
            user: userResponse(user, token)
        })
    } catch(errors) {
        res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const updateUser = async(req = request, res = response) => {
    try {
        const user = req.user
        const token = req.token
        const {email, username, password, image, bio} = req.body.user
        if(password) {
            salt = bcryptjs.genSaltSync(10);
            password = bcryptjs.hashSync(password, salt);
        }
        const userUpt = await UserModel.findByIdAndUpdate(req.user._id, {
            email: (email) ? email : user.email,
            password: (password) ? password : user.password,
            username: (username) ? username : user.username,
            image: (image) ? image : user.image,
            bio: (bio) ? bio : user.bio,
        }, {new : true})

        return res.status(200).json({
            user: userResponse(userUpt, token)
        })

    } catch(errors) {
        res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

module.exports = {
    getUser,
    updateUser
}