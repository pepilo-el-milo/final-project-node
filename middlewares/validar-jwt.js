const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user')

const validarJWT = async(req = request, res = response, next) =>{
    const token = req.header('Authorization').split(' ')[1]

    if(!token){
        return res.status(401).json({
            msg: 'A valid token is required'
        })
    }

    try{
        const {userId} = jwt.verify(token, process.env.SECRETKEY)

        const user = await UserModel.findById(userId)

        if (!user){
            return res.status(401).json({
                msg: 'Token not valid'
            })
        }

        req.user = user
        req.token = token

        next()
    } catch(err){
        console.log(err)
        return res.status(401).json({
            msg: 'Token not valid',
            err
        })
    }
}

module.exports = {
    validarJWT
}