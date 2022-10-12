const Keypoint = require('../models/Keypoint');
const {getKeypointsFromS3} = require('../services/s3_bucket')

// controller actions
module.exports.addKeypoint_post = async (req, res) => {
    try {
        const bucketData = await getKeypointsFromS3(process.env.AWS_FETCH_BUCKET_NAME);
        res.status(201).send({ message: "Keypoint is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getKeypoint_post = async (req, res) => {
    try {
        const keypoints = await Keypoint.find({pose_name: req.body.pose_name, image_id: req.body.image_id})
        res.status(201).send({Keypoints: keypoints[0].points[req.body.frameIndex], message: "Keypoints are gotten successfully" });
   } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.removeKeypoint_post = async (req, res) => {/*
    try {
        await Keypoint.findOneAndRemove({ frame_interval: req.body.frame_interval, dedicated_user: req.body.dedicated_user, pose_name: req.body.pose_name, image_id: req.body.image_id })
        res.status(201).send({ message: "Keypoint is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }*/
}