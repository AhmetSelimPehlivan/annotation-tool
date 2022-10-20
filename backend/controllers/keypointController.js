var AWS = require("aws-sdk");
AWS.config.update({
    "region": "eu-central-1",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
  });
let docClient = new AWS.DynamoDB.DocumentClient();
// controller actions

module.exports.getKeypoint_post = async (req, res) => {
    try {
        var params = {
            TableName: "Keypoint",
            Key: {
                "pose_name":  req.body.pose_name,
                "image_id": req.body.image_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("Keypoint::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else {
                res.status(201).send({Keypoints: data.Item.points.slice(req.body.frame_start, req.body.frame_end), message: "Keypoints are gotten successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getUserTasks_post = async (req, res) => {
    try {
        var params = {
            TableName: "Keypoint",
            Key: {
                "pose_name":  req.body.pose_name,
                "image_id": req.body.image_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("Keypoint::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else {
                //console.log("Keypoint::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
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