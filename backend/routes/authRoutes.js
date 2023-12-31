const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/signup', authController.signup_get);
router.get('/getsession', authController.usersession_get);
router.get('/getisAuth', authController.userauth_get);
router.get('/logout', authController.logout_get);

module.exports = router;