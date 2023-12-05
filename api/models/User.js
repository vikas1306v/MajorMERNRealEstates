const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
        ,unique: true
    },
    avatar:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKGYrZ7zdvs44LbeGRr1w8ft1nFd9SrJUdkJ9FsI&s'

    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User);