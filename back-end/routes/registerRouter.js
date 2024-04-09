const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user')


const jwt = require('jsonwebtoken')
require('dotenv').config()

// route for login after user enters existing credentials 
router.post ('/login', async (req, res) => {
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
        else{ //sucess, validation
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'} //change this 

            )
            const refreshToken = jwt.sign(
                {"username": foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'} //change this 

            )            
        }
        // if user is able to register successfuly
        res.status(200).json({message : 'Login successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot login user:' , error);
        res.status(500).json({message : 'ERROR: Cannot login user.'})
    }
});

// route for registration after user enters credentials 
router.post ('/register', async (req, res) => {
    const {user, password} = req.body; 
    const existing_user = await User.findOne({username: user}).exec();
    if(existing_user){
        return res.status(403).json({'message': 'User already exists'})
    }
    try {
        // using bcrypt to hash password:
        const hashed_password = await bcrypt.hash(password, 10);
        // once received, create a new user 
        const new_user = await User.create({
            username: user,
            password: hashed_password
        });

        //add functionality later to save user to database 
        crossOriginIsolated.log(new_user)

        // if user is able to register successfuly
        res.status(200).json({message : 'Registration successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot register user:' , error);
        res.status(500).json({message : 'ERROR: Cannot register user.'})
    }
});



module.exports = router;
