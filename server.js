const express = require('express');
const app = express();
const User = require('./models/user');
const router = require('./router')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initConnectionPool = require('./db/dbconnection');
initConnectionPool().then((data)=>{
    console.log('mongo_data',data.models);
})

app.use('/',router)
// app.post('/api/v1/user',(req,res,next)=>{
//    const user = new User();
//    console.log(user)
//    user.name = req.body.name;
//    user.age
//    user.save((err)=>{
//        if(err){
//            next(err)
//        }else{
//            return res.send('user create')
//        }
//    })
// })

// app.get('/api/v1/user',(req,res,next)=>{
//     User.find((err,result)=>{
//         if(err){
//             next(err)
//         }else{
//             return res.send(result);
//         }
//     })
// })

//error処理
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    console.log(err,'err')
    res.sendStatus(err.status || 500);
  });
  
  app.listen(3000,()=>{
    const user = new User();
    console.log(user)
      console.log('running server')
  })

  module.exports = app;