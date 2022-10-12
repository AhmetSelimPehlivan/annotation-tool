const { Router } = require('express');
const KeypointController = require('../controllers/KeypointController');

const router = Router();

router.post('/addKeypoints', KeypointController.addKeypoint_post);
router.post('/getKeypoints', KeypointController.getKeypoint_post);

module.exports = router;