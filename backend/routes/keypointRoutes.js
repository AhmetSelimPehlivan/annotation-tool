const { Router } = require('express');
const KeypointController = require('../controllers/KeypointController');

const router = Router();

router.post('/AddTaskWithKeypoints', KeypointController.getKeypoint_post);
router.post('/getUserKeypoints', KeypointController.getUserTasks_post);

module.exports = router;