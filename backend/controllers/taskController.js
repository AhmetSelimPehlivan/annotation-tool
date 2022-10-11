const Task = require('../models/Task');

// controller actions
module.exports.addTask_post = async (req, res) => {
    try {
        const user_tasks = await Task.find({pose_name: req.body.pose_name, dedicated_user: req.body.dedicated_user})
        if(user_tasks.length > 0){
            user_tasks[0].image_id.push(req.body.image_id)
            user_tasks[0].pose_index.push(req.body.pose_index)
            user_tasks[0].frame_interval.push(req.body.frame_interval)
            user_tasks[0].finished_frame_count.push(req.body.finished_frame_count)
            user_tasks[0].save()
        }
        else{console.log(req.body.pose_name)
            await Task.create({
                pose_name: req.body.pose_name,
                image_id: [req.body.image_id],
                pose_index: [req.body.pose_index],
                frame_interval: [req.body.frame_interval],
                dedicated_user: req.body.dedicated_user,
                finished_frame_count: [req.body.finished_frame_count]
            });
        }
        res.status(201).send({ message: "Task is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getTask_post = async (req, res) => {
    try {
        const userTasks = await Task.find({dedicated_user: req.body.dedicated_user})
        
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