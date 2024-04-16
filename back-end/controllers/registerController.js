const assert = require('assert')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose');
const User = mongoose.model('user')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const postLogin = async (req, res) => {
    const {user, password} =req.body

    try {
        const {user, password} = req.body
        // TODO: check if the email/username exists in the database 
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) {
            return res.status(401).json({'message' : 'Invalid User'})
        }
        const user_password = await bcrypt.compare(password, foundUser.password)
        if (!user_password) {
            return res.status(402).json({'message' : 'Invalid password.'})
        }

        const token = createToken(foundUser._id)
        res.status(200).json({user, token})
        

    }
    catch (error) {
        console.error('ERROR: Cannot login user:' , error);
        res.status(500).json({message : 'ERROR: Cannot login user.'})
    }
}

const postRegister = async (req, res) => {
    const {user, password} = req.body; 
    const existing_user = await User.findOne({username: user}).exec();
    if(existing_user){
        return res.status(403).json({'message': 'User already exists'})
    }
    try {
        //const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(password, 10);
        // once received, create a new user 
        const new_user = await User.create({
            username: user,
            password: hashed_password
        });
        console.log(new_user)
        // if user is able to register successfuly
        res.status(200).json({message : 'Registration successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot register user:' , error);
        res.status(500).json({message : 'ERROR: Cannot register user.'})
    }
}


module.exports = { postLogin, postRegister }
