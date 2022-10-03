const Image = require('../models/Image');

// controller actions
module.exports.add_Image_post = async (req, res) => {
    try { console.log(req.body)
        const image = await Image.create({ ...req.body });
        res.status(201).send({ message: "Image is added successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.get_Image_get = async (req, res) => {
    try {
        Image.find(function(err, images) {
            res.status(201).send({image_name: images[0].image_name, poses: images[0].poses, frame_count: images[0].total_frame_count, available_frame_count: images[0].available_frame_count, message: "Image is gotten successfully" });
          });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.update_frame_post = async (req, res) => {
    try { console.log("update1 ",req.body.image_name)
        const image = await Image.find({image_name: req.body.image_name})
        let frames = image[0].available_frame_count
        frames[req.body.pose_index] -= req.body.minus_frame_count
        if(await Image.updateOne({image_name:  req.body.image_name}, {$set: {available_frame_count: frames}}))
            res.status(201).send({ message: "Image is updated successfully" });
        else
            res.status(500).send({ message: "!Image is not updated\n"});

    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}