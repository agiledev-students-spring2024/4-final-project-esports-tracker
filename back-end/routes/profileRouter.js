const express = require('express');
const axios = require('axios');
const multer = require('multer')
const  { getProfile, getEditProfile, postEditProfile } = require("../controllers/profileController")


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, './Images')
    },
    filename: (req, file, callback) => {
      callback(null, req.user._id + '_' + Date.now())
    }
  })
const upload = multer({
storage: storage
})


const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


// Route to get user profile
router.get('/', getProfile);

// Route to update user profile
router.post("/postEditProfile", upload.single('image'), postEditProfile)
router.get('/getEditProfile', getEditProfile);


module.exports = router;
