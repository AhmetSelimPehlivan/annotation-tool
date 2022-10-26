const Image = require('../models/Image');

// controller actions
module.exports.add_Image_post = async (req, res) => {
    try {// console.log(req.body)
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
            frame_counts.push(images[index].available_frame_count)
        }
        uniqueArray = poseNames.filter(function(item, pos,index) {
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
        const pose = await Image.find({pose_name: req.body.pose_name, image_id: req.body.image_id})
        //console.log("pose ",pose)
        let frames = pose[0].total_frame
        let frame_request = req.body.frame_req
        //console.log("frame ",frames)
        //console.log("frame_request ",frame_request)
        for (let i = 0; i < frames.length; i++) {
            if((frames[i][1]-frames[i][0]) < req.body.frame_req){
                frames.shift()
                frame_request -= (frames[i][1]-frames[i][0])
            }
            else{
                frames[i][0] += frame_request
            }
        }
        if(await Image.updateOne({pose_name:  req.body.pose_name, image_id: req.body.image_id}, {$set: {total_frame: frames}}))
            res.status(201).send({ message: "Pose is updated successfully" });
        else
            res.status(500).send({ message: "!Pose is not updated\n"});

    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.remove_frame_post = async (req, res) => {
    try {
        const pose = await Image.find({pose_name: req.body.pose_name, image_id: req.body.image_id})
        let frames = pose.total_frame
        frames.push(req.body.frame_interval)
        frames.sort((a, b) => a[0] - b[0]);
        if(await Image.updateOne({pose_name:  req.body.pose_name, image_id: req.body.image_id}, {$set: {total_frame: frames}}))
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