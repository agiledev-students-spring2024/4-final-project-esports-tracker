const express = require("express");
const  { postLogin, postRegister } = require("../controllers/registerController")
const router = express.Router();


// route for login after user enters existing credentials 
router.post ('/login', postLogin );
router.post ('/register', postRegister);



module.exports = router;
