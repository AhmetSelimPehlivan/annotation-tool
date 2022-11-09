const Task = require('../models/Task');
var AWS = require("aws-sdk");
AWS.config.update({
    "region": "eu-west-3",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
  });
let docClient = new AWS.DynamoDB.DocumentClient();

// controller actions
module.exports.addTask_post = async (req, res) => {
    try {
        const user_tasks = await Task.find({dedicated_user: req.body.dedicated_user})
        if( user_tasks.length > 20)
            res.status(201).send({ message: "UserStack is Full" });
        else{
            var params = {
                TableName: "Keypoints",
                Key: {
                    "pose_name":  req.body.pose_name,
                    "image_id": req.body.image_id
                }
            };

            docClient.get(params, async function (err, data) {
                if (err) {
                    console.log("Keypoints::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
                    res.status(500).send({ message: "!Keypoints::fetchOneByKey::error\n" });
                }
                else {
                    const Keypoints = []
                    for (let i = 0; i < req.body.frame_intervals.length; i++) {
                        Keypoints.push(data.Item.points.slice(req.body.frame_intervals[i][0], req.body.frame_intervals[i][1]))
                    }
                    const newTask = {
                        id: user_tasks.length+1,
                        pose_name: req.body.pose_name,
                        image_id: req.body.image_id,
                        frames: Keypoints,
                        frame_intervals: req.body.frame_intervals,
                        dedicated_user: req.body.dedicated_user,
                        finished_frame_count: 0
                    };
                    await Task.create(newTask);
                    req.session.tasks.push(newTask)
                    res.status(201).send({ message: "Task is added successfully" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getTask_post = async (req, res) => {
    try {
        const userTasks = await Task.find({dedicated_user: req.body.dedicated_user, id: req.body.task_id})
        //console.log(userTasks)
        res.status(201).send({tasks: userTasks, message: "Tasks are gotten successfully" });
        //res.status(201).send({pose_name: userTasks.pose_name, image_id: userTasks.image_id, frame_interval: userTasks.frame_interval, finished_frame_count: userTasks.finished_frame_count, message: "Tasks are gotten successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeTask_post = async (req, res) => {
    try {
        await Task.findOneAndRemove({ id: req.body.task_id, dedicated_user: req.body.dedicated_user })
        res.status(201).send({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

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
            await Task.updateOne({id: task.task_id, dedicated_user: task.dedicated_user },{$set:{finished_frame_count: task.finished_frame_count }})
            res.status(201).send({tasks: tasks, isTaskFinished: false, message: "Task is added successfully" });
        }
        else{
            tasks.splice(tasks.indexOf(task), 1)
            await Task.findOneAndRemove({ id: task.task_id, dedicated_user: task.dedicated_user })
            res.status(201).send({tasks: tasks, isTaskFinished: true, message: "Task is finished successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}