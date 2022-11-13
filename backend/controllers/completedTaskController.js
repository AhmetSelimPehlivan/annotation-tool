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
            Key: { "pose_name": req.body.pose_name, "image_id": req.body.image_id },
            UpdateExpression: "set poses = :newPoses, frame_count = :new_frame_count",
            ExpressionAttributeValues: {
                ":newPoses": req.body.poses,
                ":new_frame_count": +1
            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("users::update::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("users::update::success");
            }
        });
        const tasks = req.session.tasks;
        const task = tasks.find(({id}) => id === req.body.task_id)
        if(task.frames[0].length > 1){
            task.frames[0].shift()
            task.finished_frame_count += 1;
            res.status(201).send({tasks: tasks, isTaskFinished: false, message: "Task is added successfully" });
        }
        else{
            tasks.splice(tasks.indexOf(task), 1)
            res.status(201).send({tasks: tasks, isTaskFinished: true, message: "Task is finished successfully" });
        }
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
                res.status(201).send({data: data, message: "Tasks are gotten successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.updateCompletedTask_post = async (req, res) => {
    try {
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
                console.log("users::update::success");
            }
        });
        task = req.session.tasks.find(({id}) => id === req.body.task_id)
        task.frames[0].shift()
        task.finished_frame_count += 1;
        res.status(201).send({new_frame: task.frames[0], message: "Task is finished successfully" });
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