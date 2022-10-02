const Task = require('../models/Task');
const Image = require('../models/Image');

// controller actions
module.exports.addTask_post = async (req, res) => {
    try { console.log(req.body)
        const task = await Task.create({ ...req.body });
        res.status(201).send({ message: "Task is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.getTask_get = async (req, res) => {
    try {
        Task.find(function(err, tasks) {
            console.log(tasks)
            //res.status(201).send({image_name: images[0].image_name, poses: images[0].poses, frame_count: images[0].total_frame_count, available_frame_count: images[0].available_frame_count, message: "Image is gotten successfully" });
           });
        res.status(201).send({ message: "Task is gotten successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.removeTask_post = async (req, res) => {
    try {
        await Task.findOneAndRemove({ frame_interval: req.body.frame_interval, dedicated_user: req.body.dedicated_user, image_name: req.body.image_name, pose_name: req.body.pose_name })
        res.status(201).send({ message: "Task is finished successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}