const Image = require('../models/Image');

// controller actions
module.exports.add_Image_post = async (req, res) => {
    try {// console.log(req.body)
        const image = await Image.create({ ...req.body });
        res.status(201).send({ message: "Image is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.get_Image_get = async (req, res) => {
    try {
        const image = []
        const images = await Image.find({})
        for (let index = 0; index < images.length; index++) {
            image.push({
                pose_name: images[index].pose_name,
                image_id: images[index].image_id,
                available_frame_count: images[index].available_frame_count
            })
        }
        res.status(201).send({image: image, message: "Pose is gotten successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.update_frame_post = async (req, res) => {
    try {
        const pose = await Image.find({pose_name: req.body.pose_name, image_id: req.body.image_id})
        const add_frame = []
        let frames = pose[0].total_frame
        let frame_request = req.body.frame_req
        console.log("frame ",frames)
        //console.log("frame_request ",frame_request)
        for (let i = 0; i < frames.length; i++) {
            if((frames[i][1]-frames[i][0]) < frame_request){
                add_frame.push(frames[i])
                frame_request -= (frames[i][1]-frames[i][0])
                frames.shift()
                i -= 1
            }
            else{
                console.log(frames[i][0],",",frame_request,"()",frames[i][0])
                add_frame.push([frames[i][0],frame_request+frames[i][0]])
                frames[i][0] += frame_request
            }
        }
        
        if(await Image.updateOne({pose_name:  req.body.pose_name, image_id: req.body.image_id}, {$set: {total_frame: frames, available_frame_count: (pose[0].available_frame_count-req.body.frame_req)}}))
            res.status(201).send({frame_intervals: add_frame, message: "Pose is updated successfully" });
        else
            res.status(500).send({ message: "!Pose is not updated\n"});

    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.remove_frame_post = async (req, res) => {
    try {
        const pose = await Image.find({pose_name: req.body.pose_name, image_id: req.body.image_id})
        let frames = pose[0].total_frame
        let frame_request = 0
        for (let i = 0; i < req.body.frame_interval.length; i++){
            frames.push(req.body.frame_interval[i])
            frame_request += req.body.frame_interval[i][1]-req.body.frame_interval[i][0]
        }
        frames.sort((a, b) => a[0] - b[0]);
        
        for (let i = 0; i < frames.length-1; i++)
            if(frames[i][1] === frames[i+1][0]){
                frames[i][1] = frames[i+1][1]
                frames.splice(i+1,1)
                i -= 1
            }
        console.log("frames",frames)
        if(await Image.updateOne({pose_name:  req.body.pose_name, image_id: req.body.image_id}, {$set: {total_frame: frames, available_frame_count: (pose[0].available_frame_count+frame_request)}})){
            req.session.tasks = req.session.tasks.filter(({id}) => req.body.task_id !== id)
            res.status(201).send({tasks: req.session.tasks, message: "Pose is updated successfully" });
        }
        else
            res.status(500).send({ message: "!Pose is not updated\n"});

    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}
module.exports.get_Frame_get = async (req, res) => {
    try {
        console.log("GetFrame ",req.body)
        Image.find({pose_name: req.body.pose_name})
        res.status(201).send({keypoints: req.body.keypoints})
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}