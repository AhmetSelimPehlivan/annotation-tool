const { Router } = require('express');
const s3_Controller = require('../controllers/s3_Controller');

const router = Router();

router.get('/get-from-s3', s3_Controller.readFromBucket);
router.post('/getimage-from-s3', s3_Controller.readImageFromBucket);
router.post('/upload-to-s3', s3_Controller.uploadToBucket);

module.exports = router;