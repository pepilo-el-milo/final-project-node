const { request, response } = require("express");
const UserModel = require('../models/user')

const getProfile = async (req = request, res = response) => {
    try {
        const {username} = req.params
        const user = req.user
        let profile = await UserModel.findOne({username})

        if(!profile) {
            return res.status(400).json({
                msg: `Profile with username ${username} was not found`,
                errors
            })
        }

        let following;

        if(user){
            following = (user.following.find((s) => s._id.equals(profile._id) ))
        }

        return res.status(200).json({
            profile: {
                username: profile.username,
                bio: profile.bio || null,
                image: profile.image || null,
                following: (following) ? true : false
            }
        })

    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const followUser = async (req = request, res = response) => {
    try{
        const {username} = req.params
        const user = req.user
        let profile = await UserModel.findOne({username})

        if(!profile) {
            return res.status(400).json({
                msg: `Profile with username ${username} was not found`,
                errors
            })
        }

        if(profile._id.equals(user._id)) {
            return res.status(400).json({
            msg: 'A user can\'t be followed by itself.',
                errors
            })
        }

        let following = (user.following.find((s) => s._id === profile._id ))

        if(!following) {
            user.following.push(profile)
            await user.save()

            return res.status(200).json({
                profile: {
                    username: profile.username,
                    bio: profile.bio || null,
                    image: profile.image|| null,
                    following: true
                }
            })
        } else {
            return res.status(400).json({
                msg: `You already follow the user ${username}`,
                    errors
                })
        }

    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

const unfollowUser = async (req = request, res = response) => {
    try{
        const {username} = req.params
        const user = req.user
        let profile = await UserModel.findOne({username})

        if(!profile) {
            return res.status(400).json({
                msg: `Profile with username ${username} was not found`,
                errors
            })
        }

        if(profile._id.equals(user._id)) {
            return res.status(400).json({
            msg: 'A user can\'t be unfollowed by itself.',
                errors
            })
        }

        let index = user.following.findIndex((s) => s._id === profile._id )

        user.following.splice(index, 1)
        await user.save()

        return res.status(200).json({
            profile: {
                username: profile.username,
                bio: profile.bio || null,
                image: profile.image|| null,
                following: false
            }
        })

    } catch(errors) {
        return res.status(500).json({
            msg: 'Internal Server Error',
            errors
        })
    }
}

module.exports = {
    getProfile,
    followUser,
    unfollowUser
}