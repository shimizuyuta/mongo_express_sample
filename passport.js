const passport = require('passport')
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config({path:'./config/.env'})
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')

// Call this from app.js using passportAuth.initPassport(app)
// module.exports.initPassport = function (app) {
//     app.use(passport.initialize());
    
//     passport.use('jwt', new JWTStrategy({
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET // Specify a JWT secret in .env file
//     },
//       function (jwtPayload, done) {
//         // find the user in db if needed.
//         // This functionality may be omitted if you store everything you'll need in JWT payload.
//         return done(null, jwtPayload);
//       }
//     ));


//   // Passport Strategy for login via email
//   passport.use('local',
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//         session: false // Use JWT and not session
//       },
//       async (email, password, done) => {
//         var user = await User.findOne(
//           {
//             where: { email: email },
//           })
//         if (!user) {
//           // Username doesn't exist
//           return done(null, false, { message: 'Incorrect email or password' })
//         }
//         if (!user.validPassword(password)) {
//           // Password doesn't match
//           return done(null, false, { message: 'Incorrect email or password' })
//         }
//         if (!user.isVerified) {
//             return done(null, false, { resend_email: true, message: 'Email is not Verified' })
//         }
//         // Login is successful
//         done(null, { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email });
//       }
//     )
//   )
// }
 passport.use(new LocalStrategy(
     function(email, password, done) {
       User.findOne({ email: email }, function (err, user) {
         if (err) { return done(err); }
         if (!user) { return done(null, false); }
         if (!user.verifyPassword(password)) { return done(null, false); }
         return done(null, user);
       });
     }
   ));

  // Passport strategy for login via google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: process.env.BASE_SERVER_URL + '/api/google/callback',
    callbackURL: '/auth/google/callback',
    // passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log('aaaaaaaaaaaaaa',profile)
    User.Create({ googleId: profile.id }, function (err, user) {
        console.log(err,'bbbbbbbbbb')
      return cb(err, user);
    });
  }
    // function (req, accessToken, refreshToken, profile, done) {
    //     //profileにリクエストデータが格納されている
    //   process.nextTick(async function () {
    //     try {
    //       // Check if the google profile has an email associated. Sometimes google profiles can be created by phone
    //       // numbers in which case google doesn't have an email - if email is not present, 
    //       // we fail the signup with the proper error message
    //       if (!profile._json.email) {
    //         return done(null, false,
    //           { message: 'Google Account is not registered with email. Please sign in using other methods' })
    //       }
    //       //dbにuserがあったら取得。無ければ作成
    //     //   let data = await User(
    //     //     accessToken,
    //     //     profile.id,
    //     //     profile._json.name,
    //     //     profile._json.password,
    //     //     profile._json.email,
    //     //     profile.history,
    //     //     profile.experience,
    //     //     profile.age,
    //     //     'google',
    //     //     parseInt(req.query.state))
    //     const user = new User({
    //         id:profile.id,
    //         name:profile._json.name,
    //         password:profile._json.password,
    //         email:profile._json.email,
    //         history:profile.history,
    //         exprerience:profile.experience,
    //         age:profile.age,
    //         // 'google',
    //         // parseInt(req.query.state)
    //     });
    
    //     const data = await user.save();

    //       if(data.alreadyRegisteredError){
    //         done(null, false, {
    //           message: `Email is alredy registered with ${data.medium} account. Please login with ${data.medium} account.`
    //         });
    //       } else {
    //         done(null, data);
    //         // done(null, {  id: data.id, email: data.email, firstName: data.firstName, lastName: data.lastName  });
    //       }
    //     } catch (err) {
    //       return done(null, null, {message: 'Unknown error'})
    //     }
    //   });
    // }
  ));






// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     // callbackURL: "http://www.example.com/auth/google/callback"
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));


  module.exports = passport