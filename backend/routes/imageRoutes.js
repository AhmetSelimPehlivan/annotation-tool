const { Router } = require('express');
const imageController = require('../controllers/imageController');

const router = Router();

router.post('/addImage', imageController.add_Image_post);
router.post('/update_frame', imageController.update_frame_post);
router.get('/getImage', imageController.get_Image_get);
router.get('/getFrame', imageController.get_Frame_get);

module.exports = router;