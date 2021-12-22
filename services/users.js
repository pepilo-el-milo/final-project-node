const { request, response } = require("express");

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
        const {email, username, password, image, bio} = req.body
        const user = await UserModel.findByIdAndUpdate(req.user._id, body)

    } catch(err) {
        res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

module.exports = {
    getUser
}