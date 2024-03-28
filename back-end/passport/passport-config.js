const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const autheticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user = null) {
            return done(null, false, {message: 'A user with that email doesn not exist'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
                return done(null, false, {message: 'Incorrect password'})
            }
        }
        catch(e) {
            return done(e)

        }
    }
    passport.use(new LocalStrategy ({ usernameField: 'email'},
    autheticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializelUser((id, done) => { 
        return done(null, getUserById(id))
    })
    

}

module.exports = initialize 