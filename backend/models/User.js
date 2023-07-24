const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    password:{
        type: String,
        required: true
    },
    refresh_token:{
        type: String,
    }
});
module.exports = mongoose.model('Users', UserSchema);