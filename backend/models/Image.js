const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image_name:{
        type: String,
        required: true
    },
    poses:{
        type: Array,
        required: true
    },
    available_frame_count:{
        type: Array,
        required: true
    }
});
/*
ImageSchema.pre('save', async function (next){ console.log("save")
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

ImageSchema.statics.login = async function(userName, password) {
    const user = await this.findOne({ user_name: userName });
    const auth = await bcrypt.compare(password, user.password);
    if (auth)
        return user;
    else if (!user || !auth)
        Error("!Invalid Email or Password");
  };
*/
module.exports = mongoose.model('Images', ImageSchema);
