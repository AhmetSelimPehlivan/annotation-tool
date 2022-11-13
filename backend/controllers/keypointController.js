var AWS = require("aws-sdk");
AWS.config.update({
    "region": "eu-west-3",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
  });
let docClient = new AWS.DynamoDB.DocumentClient();
// controller actions

module.exports.getKeypoint_post = async (req, res) => {
    try {
        var params = {
            TableName: "Keypoints",
            Key: {
                "pose_name":  req.body.pose_name,
                "image_id": req.body.image_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("Keypoints::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else {
                console.log("frame_intervals ", req.body.frame_intervals)
                const Keypoints = []
                for (let i = 0; i < req.body.frame_intervals.length; i++) {
                    Keypoints.push(data.Item.points.slice(req.body.frame_intervals[i][0], req.body.frame_intervals[i][1]))
                }
                res.status(201).send({keypoints : Keypoints, message: "Keypoints are gotten successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getUserTasks_post = async (req, res) => {
    try {
        var params = {
            TableName: "Keypoints",
            Key: {
                "pose_name":  req.body.pose_name,
                "image_id": req.body.image_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("Keypoints::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else {
                res.status(201).send({Keypoints: data.Item.points[req.body.frameIndex], message: "Keypoints are gotten successfully" });
            }
        })
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