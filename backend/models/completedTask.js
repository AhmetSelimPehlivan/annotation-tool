const mongoose = require('mongoose');

const CompletedTask = new mongoose.Schema({
    pose_name:{
        type: String,
        required: true
    },
    image_id:{
        type: String,
        required: true
    },
    poses: {
        type: Array,
        required: true
    },
    frame_count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CompletedTask', CompletedTask);