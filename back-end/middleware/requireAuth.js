const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) =>{
    const {authorization} = req.headers
    console.log(authorization)
    if(!authorization){
        return res.status(401).json({error: 'Authorization token missing'})
    }
    const token = authorization.split(' ')[1]
    console.log(token)
    try {
        const {_id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findOne({_id})
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: 'request is not authorized'})
    }

}


module.exports = requireAuth