const express = require('express');
const app = express();
const router = express.Router()
var passport = require('passport-local');
const LocalStrategy = require('passport-local').Strategy
// const mongoose = require('mongoose');
// const User = require('./models/user');
// mongoose.connect('mongodb://localhost/user');


// router.post('/login',passport.authenticate('local',
//  { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

// router.post('/user',(req,res,next)=>{
//    const user = new User();
//    console.log(user)
//    user.name = req.body.name;
//    user.age
//    user.save((err)=>{
//        if(err){
//            next(err)
//        }else{
//            return res.send({data:'create user'})
//        }
//    })
// })

// router.get('/user',(req,res,next)=>{
//     User.find((err,result)=>{
//         if(err){
//             console.log('error______')
//             next(err)
//         }else{
//             return res.send({data:result})
//         }
//     })
// })
module.exports = router;