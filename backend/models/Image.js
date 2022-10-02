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
    total_frame_count:{
        type: Array,
        required: true
    },
    available_frame_count:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Images', ImageSchema);
