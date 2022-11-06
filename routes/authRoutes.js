const {router} = require('express');
const authController = require('../controllers/authController');

router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.signup_get);
router.post('/signup', authController.signup_post);


module.exports = router

