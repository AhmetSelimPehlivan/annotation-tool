const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

router.post('/addTask', taskController.addTask_post);
router.get('/getTask', taskController.getTask_get);
router.post('/removeTask', taskController.removeTask_post);

module.exports = router;