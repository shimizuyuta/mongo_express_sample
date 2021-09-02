const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost/user');



router.post('/api/v1/user',(req,res,next)=>{
   const user = new User();
   console.log(user)
   user.name = req.body.name;
   user.age
   user.save((err)=>{
       if(err){
           next(err)
       }else{
           return res.send('user create')
       }
   })
})

router.get('/api/v1/user',(req,res,next)=>{
    User.find((err,result)=>{
        if(err){
            next(err)
        }else{
            return res.send(result);
        }
    })
})
module.exports = router;