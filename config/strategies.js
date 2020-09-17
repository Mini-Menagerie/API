const passport = require('passport');
require('dotenv').config()
const UserAccount = require('../models/UserAccount');
const Users = require('../models/Users');
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

        passport.use('google', new GoogleStrategy(
            {
                clientID:process.env.CLIENT_ID,
                clientSecret:process.env.CLIENT_SECRET,
                callbackURL:process.env.CALLBACK_URL,
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            (accessToken, refreshToken, profile, callback) => {
                UserAccount.findOne({
                    providerId: profile._json.sub
                }, (err, user) => {
                    if(err === null) {
                        UserAccount.findOne({
                            email: profile._json.email
                        }, (err, checkEmail) => {
                            if(err === null) {
                                Users.create({
                                    avatar: profile._json.picture
                                }, (err, avatar) => {
                                    UserAccount.create({
                                        providerId: profile._json.sub,
                                        providerName: profile.provider,
                                        email: profile._json.email,
                                        idUser: avatar._id
                                    }, (err, user) => {
                                        return callback(err, user);
                                    })
                                })
                            }else {
                                UserAccount.findOneAndUpdate({
                                    email: checkEmail.email
                                }, {
                                    providerId: profile._json.sub,
                                    providerName: profile.provider,
                                }, (err, user) => {
                                    return callback(err, user);
                                })
                            }
                        })
                    }else {
                        return callback(err, user);
                    }
                })
            }
        ));
        
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