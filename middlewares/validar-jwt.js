const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user')

const getUserFromToken = async (token) => {
    try {
        const {userId} = jwt.verify(token, process.env.SECRETKEY)

        return await UserModel.findById(userId).populate('following').populate('favorite') 
    } catch (err) {
        return null
    }
}

const validarJWT = async(req = request, res = response, next) =>{

    let token = req.header('Authorization')
    try{

        if(!token){
            return res.status(401).json({
                msg: 'A valid token is required'
            })
        }

        token = token.split(' ')[1]

        const user = await getUserFromToken(token)

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

const verificarJWT = async(req = request, res = response, next) => {
    let token = req.header('Authorization')

    if(token){
        try{
            token = token.split(' ')[1]
            const user = await getUserFromToken(token)
            
            req.user = user
            req.token = token
    
            next()
        } catch(err){
            next()
        }
    } else {
        next()
    }
    
}

module.exports = {
    validarJWT,
    verificarJWT
}