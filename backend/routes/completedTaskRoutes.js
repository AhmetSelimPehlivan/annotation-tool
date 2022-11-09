const { Router } = require('express');
const completedTaskController = require('../controllers/completedTaskController');

const router = Router();
/*
router.post('/addCompletedTask', completedTaskController.addCompletedTask_post);
router.post('/getCompletedTask', completedTaskController.getCompletedTask_post);
router.post('/updateCompletedTask', completedTaskController.updateCompletedTask_post);
router.post('/removeCompletedTask', completedTaskController.removeCompletedTask_post);
*/
module.exports = router;