'use strict'

const mongoose = require('mongoose');
const url = 'mongodb://localhost/user'


module.exports = async() =>{
  return mongoose.connect(url);
}