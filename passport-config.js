// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//         const user = await getUserByEmail(email);
//         if (user == null) {
//             return done(null, false, { message: 'No user with that email exists here' });
//         }

//         const inputCode = req.body.code;
//         if (inputCode !== '1210') {
//             return done(null, false, { message: 'Incorrect code' });
//         }

//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user);
//             } else {
//                 return done(null, false, { message: 'Password incorrect' });
//             }
//         } catch (e) {
//             return done(e);
//         }
//     };

//     passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));
//     passport.serializeUser((user, done) => done(null, user.id));
//     passport.deserializeUser(async (id, done) => {
//         return done(null, getUserById(id));
//     });
// }

// module.exports = initialize;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user with that email exists here' });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;
