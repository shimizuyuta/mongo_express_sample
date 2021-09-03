'use strict'

const mongoose = require('mongoose');
const url = 'mongodb://localhost/user'


module.exports = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology: true,
        })
        return conn
    }catch(err){
       console.log(err,'err22222222222222222')
       process.exit(1)
    }
}

// module.exports = async() =>{
//   return mongoose.connect(url);
// }

