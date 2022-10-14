var AWS = require("aws-sdk");
AWS.config.update({
    "region": "eu-west-3",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
  });
let docClient = new AWS.DynamoDB.DocumentClient();
// controller actions
module.exports.addCompletedTask_post = async (req, res) => {
    try {
        var params = {
            TableName: "CompletedTask",
            Item:  {
                "pose_name": req.body.pose_name, 
                "image_id": req.body.image_id, 
                "poses": req.body.poses,
                "frame_count": req.body.frame_count,
            }
        };
        docClient.put(params, function (err, data) {
            if (err) {
                console.log("tasks::save::error - " + JSON.stringify(err, null, 2));                      
            } else {
                console.log("tasks::save::success" );                      
            }
        });
        res.status(201).send({ message: "Task is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getCompletedTask_post = async (req, res) => {
    try {
        var params = {
            TableName: "CompletedTask",
            Key:  {
                "pose_name": req.body.pose_name, 
                "image_id": req.body.image_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else {
                console.log("data ",data)
                res.status(201).send({data: data, message: "Tasks are gotten successfully" });
                //console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            }
        })
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.updateCompletedTask_post = async (req, res) => {
    try {
        console.log("update")
        var params = {
            TableName: "CompletedTask",
            Key: { "pose_name": req.body.pose_name, "image_id": req.body.image_id },
            UpdateExpression: "set poses = :newPoses, frame_count = :new_frame_count",
            ExpressionAttributeValues: {
                ":newPoses": req.body.poses,
                ":new_frame_count": req.body.frame_count
            },
            ReturnValues: "UPDATED_NEW"
    
        };
        docClient.update(params, function (err, data) {
    
            if (err) {
                console.log("users::update::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("users::update::success "+JSON.stringify(data) );
            }
        });
        res.status(201).send({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeCompletedTask_post = async (req, res) => {
    try {
        var params = {
            TableName: "CompletedTask",
            Key: {
                "pose_name":  req.body.pose_name,
                "image_id": req.body.image_id
            }
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                console.log("tasks::delete::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("tasks::delete::success");
            }
        });
       // await Task.findOneAndRemove({ frame_interval: req.body.frame_interval, dedicated_user: req.body.dedicated_user, pose_name: req.body.pose_name, image_id: req.body.image_id })
        res.status(201).send({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}