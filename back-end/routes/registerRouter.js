if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const bcrypt = require('bcrypt')
const router = express.Router()
const users = []
const passport = require('passport')
const initializePassport = require('./passport/passport-config')
initializePassport(
    passport, 
    email =>  users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
const flash = require('express-session')
const methodOvveride = require('method-override')



router.use(express.urlencoded({ extended:false }))
router.use(flash()) 
router.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false

})) 
router.use(passport.initialize())
router.use(session.initialize())
router.use(methodOvveride('_method'))

router.get('/profile', checkAutheticated, (req, res) => {
    res.render('profile.js')
})

router.get('/login', checkNotAutheticated, (req, res) => {
    res.render('login.js')
})

router.post('/login', checkNotAutheticated, passport.authenticate('local', {
    successRedirect: '/profile.js',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', checkNotAutheticated, (req, res) => {
    res.render('register.js')
})
router.post('/register', checkNotAutheticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push ({
            id: Date.now.toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } 
    catch {
        res.redirect('/register')
    }
    console.log(users);
    
})

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
}) 

function checkAutheticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('login')
    
}

function checkNotAutheticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile.js')
    }
    next()
}

module.exports = router