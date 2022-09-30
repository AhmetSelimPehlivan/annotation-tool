const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    image_name:{
        type: String,
        required: true
    },
    pose_name:{
        type: String,
        required: true
    },
    frame_interval:{
        type: Array,
        required: true
    },
    dedicated_user: {
        type: String,
        required: true
    },
    finished_frame_count: {
        type: Number,
        required: true
    }
});
/*
TaskSchema.pre('save', async function (next){ console.log("save")
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

TaskSchema.statics.login = async function(userName, password) {
    const user = await this.findOne({ user_name: userName });
    const auth = await bcrypt.compare(password, user.password);
    if (auth)
        return user;
    else if (!user || !auth)
        Error("!Invalid Email or Password");
  };*/

module.exports = mongoose.model('Tasks', TaskSchema);