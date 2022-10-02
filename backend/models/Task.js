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

module.exports = mongoose.model('Tasks', TaskSchema);