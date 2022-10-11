const Image = require('../models/Image');

// controller actions
module.exports.add_Image_post = async (req, res) => {
    try { console.log(req.body)
        const image = await Image.create({ ...req.body });
        res.status(201).send({ message: "Image is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.get_Image_get = async (req, res) => {
    try {
        const poseNames = []
        const image_ids = []
        const frame_counts = []
        const images = await Image.find({})
        for (let index = 0; index < images.length; index++) {
            poseNames.push(images[index].pose_name)
            image_ids.push(images[index].image_id)
            frame_counts.push(images[index].total_frame_count)
        }
        uniqueArray = poseNames.filter(function(item, pos,index) {
                if(poseNames.indexOf(item) === pos)
                    console.log(item, pos)
                //console.log("i ",poseNames.indexOf(item) === pos)
            return poseNames.indexOf(item) === pos;
        })
        res.status(201).send({pose_name: poseNames, image_id: image_ids, frame_count: frame_counts, available_frame_count: frame_counts, message: "Pose is gotten successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.update_frame_post = async (req, res) => {
    try {
        const pose = await Image.find({pose_name: req.body.pose_name})
        let frames = pose[0].available_frame_count
        console.log("frames ",frames)
        frames[req.body.pose_index] -= req.body.minus_frame_count
        if(await Image.updateOne({pose_name:  req.body.pose_name}, {$set: {available_frame_count: frames}}))
            res.status(201).send({ message: "Pose is updated successfully" });
        else
            res.status(500).send({ message: "!Pose is not updated\n"});

    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.get_Frame_get = async (req, res) => {
    try {
        console.log("GetFrame ",req.body)
        Image.find({pose_name: req.body.pose_name})
        res.status(201).send({keypoints: req.body.keypoints})
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}