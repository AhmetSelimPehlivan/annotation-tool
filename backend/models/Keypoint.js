const mongoose = require('mongoose');

const KeypointSchema = new mongoose.Schema({
    image_id:{
        type: String,
        required: true
    },
    points:{
        type: Array,
        required: true
    },
    frame_count:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Keypoints', KeypointSchema);
