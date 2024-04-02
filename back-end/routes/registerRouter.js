const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

// Mock data
const user_profile = {
    email: 'temp@email',
    password: 'test',
};


// route for login after user enters existing credentials 
router.post ('/login', async (req, res) => {
    try {
        //if user doesn't exist 
        const existing_user = user_profile[req.body.email];
        if (!existing_user) {
            return res.status(401).json({'messagge' : 'Invalid email or password'})
        }

        //if not user password 
        const user_password = await bycrypt.compare(req.body.password, existing_user.password)
        if (!user_password) {
            return res.status(401).json({'messagge' : 'Invalid email or password'})
        }


        // if user is able to register successfuly
        res.status(200).json({message : 'Login successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot login user:' , error);
        res.status(500).json({message : 'ERROR: Cannot login user:'})
    }
});

// route for registration after user enters credentials 
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

        //add functionality later to save user to database 


        // if user is able to register successfuly
        res.status(200).json({message : 'Registration successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot register user:' , error);
        res.status(500).json({message : 'ERROR: Cannot register user:'})
    }
});



module.exports = router;
