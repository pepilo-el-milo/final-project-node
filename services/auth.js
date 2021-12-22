const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
require('dotenv').config()

const login = async(req = request, res = response) => {
    const {email, password} = req.body.user

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: `User with email ${email} doesn't exist`
            })
        }

        const validPassword = bcryptjs.compareSync(password,user.password)

        if(!validPassword){
            return res.status(400).json({
                msg: `Email / Password are incorrect`
            })
        }

        const token = jwt.sign({userId : user._id}, process.env.SECRETKEY, {expiresIn: '1h'})

        return res.status(200).json({
            user: {
                email: user.email,
                token,
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

const createUser = async(req = request, res = response) => {

    try {
        const {username, email, password} = req.body.user

        let user = await UserModel.findOne({email})

        if(user){
            return res.status(400).json({
                msg: `User with email ${email} already exists`
            })
        }
        user = new UserModel({
            username,
            email,
            password
        })

        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);

        await user.save()
        
        const token = jwt.sign({userId : user._id}, process.env.SECRETKEY, {expiresIn: '1h'})

        return res.status(201).json({
            user: {
                email: user.email,
                token,
                username: user.username,
                bio: user.bio || null,
                image: user.image || null
            }
        })

    } catch(errors){
        res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }

}

module.exports = {
    login,
    createUser
}