const Task = require('../models/Task');

// controller actions
module.exports.addTask_post = async (req, res) => {
    try {
        const user_tasks = await Task.find({dedicated_user: req.body.dedicated_user})
        if( user_tasks.length > 20)
            res.status(201).send({ message: "UserStack is Full" });
        else{
            const newTask = { 
                _id: user_tasks.length+1,
                pose_name: req.body.pose_name,
                image_id: req.body.image_id,
                frames: req.body.frame,
                frame_interval: req.body.frame_interval,
                dedicated_user: req.body.dedicated_user,
                finished_frame_count: req.body.finished_frame_count};
            await Task.create(newTask);
            req.session.tasks.push(newTask)
            res.status(201).send({ message: "Task is added successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getTask_post = async (req, res) => {
    try {
        const userTasks = await Task.find({dedicated_user: req.body.dedicated_user, _id: req.body.task_id})
        
        //console.log(userTasks)
        res.status(201).send({tasks: userTasks, message: "Tasks are gotten successfully" });
        //res.status(201).send({pose_name: userTasks.pose_name, image_id: userTasks.image_id, frame_interval: userTasks.frame_interval, finished_frame_count: userTasks.finished_frame_count, message: "Tasks are gotten successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeTask_post = async (req, res) => {
    try {
        await Task.findOneAndRemove({ frame_interval: req.body.frame_interval, dedicated_user: req.body.dedicated_user, pose_name: req.body.pose_name, image_id: req.body.image_id })
        res.status(201).send({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}