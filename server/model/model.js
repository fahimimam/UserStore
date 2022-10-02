const mongoose = require('mongoose');
const { setThePassword } = require('whatwg-url');

var schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;