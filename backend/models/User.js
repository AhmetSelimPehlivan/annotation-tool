const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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
    }
});

UserSchema.pre('save', async function (next){// console.log("save")
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.statics.login = async function(userName, password) {
    const user = await this.findOne({ user_name: userName });
    const auth = await bcrypt.compare(password, user.password);
    console.log(user)
    console.log(auth)
    if (auth)
        return user;
    else if (!user || !auth)
        Error("!Invalid Email or Password");
  };

module.exports = mongoose.model('Users', UserSchema);