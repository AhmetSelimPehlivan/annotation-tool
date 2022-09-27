const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
UserSchema.methods.generateAuthToken = function () { 
    console.log("auth")
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
module.exports = mongoose.model('Users', UserSchema);