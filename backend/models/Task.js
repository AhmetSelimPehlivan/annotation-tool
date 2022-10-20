const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    _id: {
        type: Number, 
        required: true
    },
    pose_name:{
        type: String,
        required: true
    },
    image_id:{
        type: String,
        required: true
    },
    frames:{
        type: Array,
        required: true
    },
    frame_interval:{
        type: Map,
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