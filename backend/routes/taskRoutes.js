const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

router.post('/addTask', taskController.addTask_post);
router.post('/getTask', taskController.getTask_post);
router.post('/removeTask', taskController.removeTask_post);
router.post('/addCompletedTask', taskController.addCompletedTask_post);

module.exports = router;