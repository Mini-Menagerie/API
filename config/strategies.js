const passport = require('passport');
require('dotenv').config()
const UserAccount = require('../models/UserAccount');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = {
    strategies : () => {
        passport.use(new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    ExtractJwt.fromUrlQueryParameter('secret_token'),
                    ExtractJwt.fromHeader('secret_token'),
                    ExtractJwt.fromAuthHeaderAsBearerToken(),
                ]),
                secretOrKey:process.env.SECRET_KEY_TOKEN
            },
            async (jwt_payload, done) => {
                try {
                    const user = await UserAccount.findOne({_id: jwt_payload.id});

                    if(!user){
                        return done(null, false, {message : "User not found"})
                    } else {
                        return done(null, user)
                    }
                }
                catch(error){
                    res.status(500).json({
                        message: "internal server error",
                    })
                }
            }
        ))

        // passport.use(new GoogleStrategy(
        //     {
        //         clientID:process.env.CLIENT_ID,
        //         clientSecret:process.env.CLIENT_SECRET,
        //         callbackURL:process.env.CALLBACK_URL,
        //         profileFields: ['id', 'displayName', 'photos', 'email']
        //     },
        //     (accessToken, refreshToken, profile, callback) => {
        //         console.log(profile);
        //         Users.findOne({
        //             providerId: profile.sub
        //         })
        //         .then((result) => {
        //             return callback(result)
        //         })
        //         .catch(() => {
        //             Users.findOne({
        //                 email: profile._json.email
        //             })
        //             .then(() => {
        //                 Users.findOneAndUpdate({
        //                     email: email
        //                 }, {
        //                     providerId: profile.sub,
        //                     provider: profile.provider,
        //                 })
        //                 .then((result) => {
        //                     return callback(result)
        //                 })
        //                 .catch((err) => {
        //                     return callback(err)
        //                 })
        //             })
        //             .catch(() => {
        //                 Users.create({
        //                     providerId: profile.sub,
        //                     provider: profile.provider,
        //                     fullName: profile.displayName,
        //                     email: profile._json.email
        //                 })
        //                 .then((result) => {
        //                     return callback(result)
        //                 })
        //                 .catch((err) => {
        //                     return callback(err)
        //                 })
        //             })
        //         })
        //     }
        // ));
        
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
          
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
        });
    }
}