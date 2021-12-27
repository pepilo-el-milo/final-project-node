const { request, response } = require("express");
const bcryptjs = require('bcryptjs')

const UserModel = require('../models/user')

const getUser = async (req = request, res= response) => {
    try {
        const user = await UserModel.findById(req.user._id)

        return res.status(200).json({
            user: {
                email: user.email,
                token: req.token,
                username: user.username,
                bio: user.bio || null,
                image: user.image || null
            }
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
        const {email, username, password, image, bio} = req.body.user
        if(password) {
            salt = bcryptjs.genSaltSync(10);
            password = bcryptjs.hashSync(password, salt);
        }
        const user = await UserModel.findByIdAndUpdate(req.user._id, {
            email: (email) ? email : req.user.email,
            password: (password) ? password : req.user.password,
            username: (username) ? username : req.user.username,
            image: (image) ? image : req.user.image,
            bio: (bio) ? bio : req.user.bio,
        }, {new : true})

        return res.status(200).json({
            user: {
                email: user.email,
                token: req.token,
                username: user.username,
                bio: user.bio || null,
                image: user.image || null
            }
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