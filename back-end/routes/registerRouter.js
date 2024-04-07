const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

// mock data (password saved as hash)
const user_profile = {
    email: 'test@test',
    password: '$2b$10$quMB2RSiNBmrSZQ5T5JiheVNYREIe26EQTCB9LeLd9zal0K9HRtyu',
};


// route for login after user enters existing credentials 
router.post ('/login', async (req, res) => {
    try {
        // TODO: check if the email/username exists in the database 
        const existing_user = user_profile.email === req.body.email
        if (!existing_user) {
            return res.status(401).json({'message' : 'Invalid email.'})
        }

        //if not user password 
        const user_password = await bcrypt.compare(req.body.password, user_profile.password)
        if (!user_password) {
            return res.status(401).json({'message' : 'Invalid password.'})
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

    try {
        // TODO: replace this with client-side validation (use the required keyword in forms)
        if (!user) {
          return res.status(422).json({ message: 'Cannot register user. Missing email.' })
        }
        if (!password) {
          return res.status(422).json({ message: 'Cannot register user. Missing password.' })
        }
        // using bcrypt to hash password:
        const hashed_password = await bcrypt.hash(password, 10);

        // once received, create a new user 
        const new_user = {
            user,
            password: hashed_password
        };

        //add functionality later to save user to database 


        // if user is able to register successfuly
        res.status(200).json({message : 'Registration successful'})

    }
    catch (error) {
        console.error('ERROR: Cannot register user:' , error);
        res.status(500).json({message : 'ERROR: Cannot register user.'})
    }
});



module.exports = router;
