const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>
{
    try
    {
        const token = req.header('Authorization').replace('Bearer ', '') //remove Bearer from the header from postman
        //token from the header

        const decoded = jwt.verify(token, process.env.JWT_SECRET)  //decoded payload
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) //user from database

        if(!user)
        {
            throw new Error()
        }

        req.token = token //sending the token from header using req to be acccessed in routes
        
        req.user = user 
        /*adding property 
        onto request as the users 
        has already been fetched 
        and no need for the 
        route handlers to again 
        fetch user details*/
        next()
    }
    catch(e)
    {
        res.status(401).send({ error: 'Please Authenticate' })
    }
    
} 

module.exports = auth

