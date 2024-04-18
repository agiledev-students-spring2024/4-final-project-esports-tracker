const express = require('express');
const axios = require('axios');
const router = express.Router();
const  { getProfile, getEditProfile, postEditProfile } = require("../controllers/profileController")

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


// Route to get user profile
router.get('/', getProfile);

// Route to update user profile
router.get('/getEditProfile', getEditProfile);
router.post('/postEditProfile', postEditProfile)

module.exports = router;
