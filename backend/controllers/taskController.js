var AWS = require("aws-sdk");
AWS.config.update({
    "region": "eu-west-3",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
  });
let docClient = new AWS.DynamoDB.DocumentClient();
const Task = require('../models/Task');

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
                    //console.log("Keypoint::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
                    console.log("frame_intervals ", req.body.frame_intervals)
                    const Keypoints = []
                    for (let i = 0; i < req.body.frame_intervals.length; i++) {
                        Keypoints.push(data.Item.points.slice(req.body.frame_intervals[i][0], req.body.frame_intervals[i][1]))
                    }
                    console.log(user_tasks.length+1)

                    const user_same_task = await Task.find({pose_name: req.body.pose_name, image_id: req.body.image_id, dedicated_user: req.body.dedicated_user})
                    
                    console.log("user_same_task",user_same_task)
                    if(user_same_task.length !== 0){
                        console.log("hi")
                        await Task.updateOne({pose_name: req.body.pose_name, image_id: req.body.image_id, dedicated_user: req.body.dedicated_user}, 
                            {$push: {frames: Keypoints, frame_intervals: req.body.frame_intervals}})
                        console.log(req.session.tasks)
                    }
                    else{
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
                        console.log(user_tasks.length+1)
                        req.session.tasks.push(newTask)
                    }
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