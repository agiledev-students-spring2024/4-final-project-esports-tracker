const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

// route for registration after user enter login 

router.post ('/register', async (req, res) => {
    const {email, password} = req.body; 

    try {
        // using bcrypt to hash password:

        const hashed_password = await bycrypt.hash(password, 10);

        // once received, create a new user 
        const new_user = {
            email,
            password: hashed_password
        };

        // if user is able to register successfuly
        res.status().json({message : 'Registration successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot register user:' , error);
        res.status(500).json({message : 'ERROR: Cannot register user:'})
    }
});

module.exports = router;
