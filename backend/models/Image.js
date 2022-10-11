const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    pose_name:{
        type: String,
        required: true
    },
    image_id:{
        type: String,
        required: true
    },
    total_frame_count:{
        type: Number,
        required: true
    },
    available_frame_count:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Images', ImageSchema);
